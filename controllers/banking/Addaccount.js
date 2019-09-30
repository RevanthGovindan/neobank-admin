import Session from '../../helpers/SessionHandler';
import Response from '../../helpers/Response';
import ErrorHandler from '../../helpers/Errorhandler';
import Bankaccount from '../../models/Bankaccounts';
import { randomNumber } from '../../helpers/utils';
import { infoId } from '../../common/constants';

export default class Addaccount extends Session {
    constructor(request, httpResponse) {
        super();
        this.request = request;
        this.body = request.body.data;
        this.httpResponse = httpResponse;
        this.responseObj = new Response();
        this.errorObj = new ErrorHandler();
    }

    controller() {
        this.addBankAccount();
    }

    async addBankAccount() {
        try {
            let account = {
                account_id: randomNumber().toString(),
                account_type: this.body.account_type,
                customer_id: this.body.customer_id,
                balance: this.body.amount,
                customer_name: this.body.customer_name
            };
            for (let key in account) {
                if (account[key]) {
                    continue;
                } else {
                    throw new Error("Missing fields");
                }
            }
            Bankaccount.findOne({
                account_id: account.account_id
            }).then((bankAccount) => {
                if (!bankAccount) {
                    Bankaccount.create(account).then((result) => {
                        if (result) {
                            this.responseObj.setStatus = 201;
                            this.responseObj.setInfoID = infoId.SUCCESS;
                            this.responseObj.infoMsg = "Account added";
                            this.responseObj.send(this.httpResponse);
                        } else {
                            throw new Error("Failed");
                        }
                    }).catch((error) => {
                        this.errorObj.setStatus = 400;
                        this.errorObj.setInfoID = infoId.FAILED;
                        this.errorObj.setInfoMsg = error.message;
                        this.errorObj.send(this.httpResponse);
                    });
                } else {
                    this.addBankAccount();
                }
            }).catch((error) => {
                this.errorObj.setStatus = 400;
                this.errorObj.setInfoID = infoId.FAILED;
                this.errorObj.setInfoMsg = error.message;
                this.errorObj.send(this.httpResponse);
            });
        } catch (error) {
            this.errorObj.setStatus = 400;
            this.errorObj.setInfoID = infoId.FAILED;
            this.errorObj.setInfoMsg = error.message;
            this.errorObj.send(this.httpResponse);
        }
    }
}