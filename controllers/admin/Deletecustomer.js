import Customer from '../../models/Customer';
import Response from '../../helpers/Response';
import ErrorHandler from '../../helpers/Errorhandler';
import Session from '../../helpers/SessionHandler';
import { infoId } from '../../common/constants';

export default class DeleteCustomer extends Session {
    constructor(request, httpResponse) {
        super();
        this.request = request;
        this.body = request.params;
        this.httpResponse = httpResponse;
        this.responseObj = new Response();
        this.errorObj = new ErrorHandler();
    }

    controller() {
        this.deleteCustomer();
    }

    async deleteCustomer() {
        Customer.deleteOne({
            customer_id: this.body.customer_id
        }).then((result) => {
            if (result) {
                this.responseObj.setStatus = 200;
                this.responseObj.infoMsg = "Customer deleted";
                this.responseObj.send(this.httpResponse);
            } else {
                throw new Error("Failed");
            }
        }).catch((error) => {
            this.errorObj.setInfoID = infoId.FAILED;
            this.errorObj.setStatus = 424;
            this.errorObj.setInfoMsg = error.message;
            this.errorObj.send(this.httpResponse);
        });
    }
}