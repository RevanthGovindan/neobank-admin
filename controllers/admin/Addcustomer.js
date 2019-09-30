import { randomNumber } from '../../helpers/utils';
import Customer from '../../models/Customer';
import CustomerAuthentication from '../../models/CustomerAuthentication';
import Response from '../../helpers/Response';
import ErrorHandler from '../../helpers/Errorhandler';
import Session from '../../helpers/SessionHandler';
import sendMail from '../../helpers/mailsender';
import { infoId } from '../../common/constants';

export default class Addcustomer extends Session {
    constructor(request, httpResponse) {
        super();
        this.request = request;
        this.body = request.body.data;
        this.httpResponse = httpResponse;
        this.responseObj = new Response();
        this.errorObj = new ErrorHandler();
    }

    controller() {
        this.createCustomer();
    }

    async createCustomer() {
        let customer = {
            customer_name: this.body.customer_name,
            customer_email: this.body.customer_email,
            customer_id: randomNumber().toString()
        }
        Customer.findOne({ customer_id: customer.customer_id }).then((oldCustomer) => {
            if (!oldCustomer) {
                Customer.create(customer).then(result => {
                    if (result) {
                        this.createMpin(result.customer_id)
                    } else {
                        throw new Error("Failed");
                    }
                }).catch((error) => {
                    this.errorObj.setStatus = 424;
                    this.errorObj.setInfoMsg = error.message;
                    this.errorObj.send(this.httpResponse);
                });
            } else {
                this.createCustomer();
            }
        }).catch((error) => {
            this.errorObj.setStatus = 424;
            this.errorObj.setInfoMsg = error.message;
            this.errorObj.send(this.httpResponse);
        });

    }

    createMpin(customer_id) {
        CustomerAuthentication.create({
            customer_id: customer_id,
            mpin: randomNumber(4)
        }).then((authentication) => {
            if (authentication) {
                //this.sendMailMpin(customer_id, authentication.mpin)
                this.responseObj.setData = { customer_id: customer_id }
                this.responseObj.setStatus = 201;
                this.responseObj.infoMsg = "Customer Created";
                this.responseObj.send(this.httpResponse);
            }
        }).catch((error) => {
            this.errorObj.setInfoID = infoId.FAILED;
            this.errorObj.setStatus = 424;
            this.errorObj.setInfoMsg = error.message;
            this.errorObj.send(this.httpResponse);
        });
    }

    sendMailMpin(customer_id, mpin) {
        let emailData = {
            email: this.body.customer_email,
            value: `Your mpin for the customer id ${customer_id} is ${mpin}`
        };
        let mpinMail = new Promise((resolve, reject) => {
            sendMail(emailData, resolve, reject);
        }).then((result) => {
            this.responseObj.setData = { customer_id: customer_id }
            this.responseObj.setStatus = 201;
            this.responseObj.infoMsg = "Customer Created";
            this.responseObj.send(this.httpResponse);
        }).catch((error) => {
            this.errorObj.setInfoMsg = "Customer created email failed";
            this.errorObj.send(this.httpResponse);
        });
    }
}