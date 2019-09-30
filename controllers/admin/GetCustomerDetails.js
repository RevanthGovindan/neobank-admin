import Response from '../../helpers/Response';
import ErrorHandler from '../../helpers/Errorhandler';
import Session from '../../helpers/SessionHandler';
import Customer from '../../models/Customer';
import { infoId } from '../../common/constants';

export default class GetCustomerDetails extends Session {
    constructor(request, httpResponse) {
        super();
        this.request = request;
        this.body = request.params;
        this.httpResponse = httpResponse;
        this.responseObj = new Response();
        this.errorObj = new ErrorHandler();
    }

    controller() {
        this.getCustomerDetails();
    }

    getCustomerDetails() {

        Customer.aggregate([
            { $match: { customer_id: this.body.customer_id } },
            {
                $lookup: {
                    from: 'bankaccounts',
                    localField: 'customer_id',
                    foreignField: 'customer_id',
                    as: 'bankDetails'
                }
            },
            {
                $project: {
                    _id: 0,
                    customer_name: 1,
                    customer_email: 1,
                    customer_id: 1,
                    "bankDetails.account_id": 1,
                    "bankDetails.account_type": 1,
                    "bankDetails.balance": 1
                }
            }
        ]).then((result) => {
            if (result) {
                this.responseObj.setData = result;
                this.responseObj.setInfoID = infoId.SUCCESS;
                this.responseObj.setStatus = 200;
                this.responseObj.infoMsg = "Customers";
                this.responseObj.send(this.httpResponse);
            } else {
                throw new Error("No Data Found");
            }
        }).catch((error) => {
            this.errorObj.setInfoID = infoId.FAILED;
            this.errorObj.setStatus = 200;
            this.errorObj.setInfoMsg = error.message;
            this.errorObj.send(this.httpResponse);
        });
    }
}