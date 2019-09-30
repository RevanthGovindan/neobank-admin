import Session from '../../helpers/SessionHandler';
import Response from '../../helpers/Response';
import ErrorHandler from '../../helpers/Errorhandler';
import Bankaccount from '../../models/Bankaccounts';
import { infoId } from '../../common/constants';

export default class Deleteaccount extends Session {
    constructor(request, httpResponse) {
        super();
        this.request = request;
        this.body = request.params;
        this.httpResponse = httpResponse;
        this.responseObj = new Response();
        this.errorObj = new ErrorHandler();
    }

    controller() {
        this.deleteBankAccount();
    }
    async deleteBankAccount() {
        try {
            if(!this.body.account_id){
                throw new Error("Account number required");
            }
            Bankaccount.deleteOne({
                account_id: this.body.account_id
            }).then((result) => {
                if (result.deletedCount !== 0) {
                    this.responseObj.setInfoID = infoId.SUCCESS;
                    this.responseObj.infoMsg = "Account deleted";
                    this.responseObj.send(this.httpResponse);
                } else {
                    throw new Error("Invalid account number");
                }
            }).catch((error) => {
                this.errorObj.setInfoID = infoId.FAILED;
                this.errorObj.setStatus = 400;
                this.errorObj.setInfoMsg = error.message;
                this.errorObj.send(this.httpResponse);
            });
        } catch (error) {
            this.errorObj.setInfoID = infoId.FAILED;
            this.errorObj.setStatus = 400;
            this.errorObj.setInfoMsg = error.message;
            this.errorObj.send(this.httpResponse);
        }
    }
}