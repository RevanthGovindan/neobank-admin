import Customer from '../../models/Customer';
import Response from '../../helpers/Response';
import ErrorHandler from '../../helpers/Errorhandler';
import Session from '../../helpers/SessionHandler';
import { infoId } from '../../common/constants';

export default class EditCustomer extends Session {
    constructor(request, httpResponse) {
        super();
        this.request = request;
        this.body = request.body.data;
        this.httpResponse = httpResponse;
        this.responseObj = new Response();
        this.errorObj = new ErrorHandler();
    }

    controller() {
        this.updateUser();
    }

    async updateUser() {
        let customer = {
            customer_name: this.body.customer_name,
            customer_email: this.body.customer_email
        }

        Customer.updateOne({ customer_id: this.body.customer_id },
            customer).then((result) => {
                if (result) {
                    this.responseObj.setInfoID = infoId.SUCCESS;
                    this.responseObj.setStatus = 200;
                    this.responseObj.infoMsg = "Customer updated";
                    this.responseObj.send(this.httpResponse);
                } else {
                    throw new Error("Falied");
                }
            }).catch((error) => {
                this.errorObj.setInfoID = infoId.FAILED;
                this.errorObj.setStatus = 424;
                this.errorObj.setInfoMsg = error.message;
                this.errorObj.send(this.httpResponse);
            });
    }
}