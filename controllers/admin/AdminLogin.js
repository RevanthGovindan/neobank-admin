import Sessions from '../../models/Sessions';
import Admin from '../../models/Admin';
import Response from '../../helpers/Response';
import ErrorHandler from '../../helpers/Errorhandler';
import uuid from 'uuid';
import { encrypt } from '../../helpers/Crypto';
import { infoId } from '../../common/constants';

export default class AdminLogin {
    constructor(request, httpResponse) {
        this.request = request;
        this.body = request.body.data;
        this.httpResponse = httpResponse;
        this.responseObj = new Response();
        this.errorObj = new ErrorHandler();
    }

    async adminLogin() {
        Admin.findOne({
            admin_id: this.body.admin_id,
            admin_password: this.body.admin_password
        }).then(async (adminData) => {
            if (adminData) {
                let session_id = await this.createSession(adminData.admin_id);
                let encAuth = encrypt({
                    session_id: session_id,
                    user_id: adminData.admin_id
                });
                let userData = {
                    session_id: encAuth,
                    admin_name: adminData.admin_name,
                    admin_email: adminData.admin_email,
                    admin_id: adminData.admin_id
                }
                this.responseObj.setInfoID = infoId.SUCCESS;
                this.responseObj.setInfoMsg = "Login Success";
                this.responseObj.setData = userData;
                this.responseObj.send(this.httpResponse);
            } else {
                throw new Error("Invalid Credentials");
            }
        }).catch((error) => {
            this.errorObj.setInfoID = infoId.UNAUTHORIZED;
            this.errorObj.setInfoMsg = error.message;
            this.errorObj.send(this.httpResponse);
        });
    }

    async createSession(admin_id) {
        let session = await Sessions.updateOne(
            {
                user_id: admin_id
            },
            {
                session_id: uuid(),
                isActive: true
            },
            {
                upsert: true
            }
        ).then(async (result) => {
            return await Sessions.findOne({ user_id: admin_id });
        }).catch((error) => {
            this.errorObj.setInfoMsg = error.message;
            this.errorObj.send(this.httpResponse);
        });
        return session.session_id;
    }
}