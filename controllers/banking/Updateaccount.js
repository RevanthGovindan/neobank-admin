import Session from '../../helpers/SessionHandler';
import Response from '../../helpers/Response';
import ErrorHandler from '../../helpers/Errorhandler';
import Bankaccount from '../../models/Bankaccounts';
import { infoId } from '../../common/constants';

export default class Updateaccount extends Session {
    constructor(request, httpResponse) {
        super();
        this.request = request;
        this.body = request.body.data;
        this.httpResponse = httpResponse;
        this.responseObj = new Response();
        this.errorObj = new ErrorHandler();
    }

    controller() {
        this.updateBankAccount();
    }

    async updateBankAccount() {
        try {
            let account = {
                account_type: this.body.account_type,
                balance: this.body.amount
            };
            for (let key in account) {
                if (account[key]) {
                    continue;
                } else {
                    throw new Error("Missing fields");
                }
            }
            Bankaccount.updateOne({
                account_id: this.body.account_id,
                customer_id: this.body.customer_id
            }, account).then((result) => {
                if (result.nModified !== 0) {
                    this.responseObj.setInfoID = infoId.SUCCESS;
                    this.responseObj.infoMsg = "Account updated";
                    this.responseObj.send(this.httpResponse);
                } else {
                    throw new Error("Invalid Details");
                }
            }).catch((error) => {
                this.errorObj.setStatus = 400;
                this.errorObj.setInfoMsg = error.message;
                this.errorObj.send(this.httpResponse);
            });
        } catch (error) {
            this.errorObj.setInfoID = infoId.FAILED;
            this.errorObj.setInfoMsg = error.message;
            this.errorObj.send(this.httpResponse);
        }
    }
}