import Response from '../../helpers/Response';
import ErrorHandler from '../../helpers/Errorhandler';
import Session from '../../helpers/SessionHandler';
import Customer from '../../models/Customer';
import { infoId } from '../../common/constants';

export default class GetCustomers extends Session {
    constructor(request, httpResponse) {
        super();
        this.request = request;
        this.body = request.params;
        this.httpResponse = httpResponse;
        this.responseObj = new Response();
        this.errorObj = new ErrorHandler();
    }

    controller() {
        this.getCustomers();
    }

    getCustomers() {
        let regex = `^${this.body.customer_id}`;
        // Customer.find({
        //     customer_id: {
        //         $regex: regex,
        //     }
        // }).limit(10)
        Customer.find({}, { _id: 0, customer_name: 1, customer_email: 1, customer_id: 1 })
            .then((result) => {
                if (result && result.length > 0) {
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