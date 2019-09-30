import Sessions from '../models/Sessions';
import ErrorHandler from './Errorhandler';
import { decrypt } from '../helpers/Crypto';
import { infoId } from '../common/constants';
import log4j from '../helpers/log4j';
export default class Session {
    constructor() {
        this.errorObj = new ErrorHandler();
        this.user_id = "";
        this.session_id = "";
    }

    doProcess() {
        if (this.request.method === "GET" || this.request.method === "DELETE") {
            log4j.debug("GET " + this.request.url," Params: "+JSON.stringify(this.request.params));
        }
        if (this.request.method === "POST" || this.request.method === "PUT") {
            log4j.debug("POST " + this.request.url, " Body : ", this.request.body);
        }
        this.checkSession();
    }

    checkSession() {
        try {
            let authData = JSON.parse(decrypt(this.request.headers.authorization));
            this.user_id = authData.user_id;
            this.session_id = authData.session_id;
            Sessions.findOne({
                session_id: authData.session_id,
                user_id: authData.user_id
            }).then((result) => {
                if (result && result.isActive) {
                    this.controller();
                } else {
                    throw new Error("Invalid Session");
                }
            }).catch((error) => {
                this.errorObj.setInfoID = infoId.UNAUTHORIZED;
                this.errorObj.setInfoMsg = error.message;
                this.errorObj.status = 401;
                this.errorObj.send(this.httpResponse);
            });
        } catch (error) {
            this.errorObj.setInfoID = infoId.UNAUTHORIZED;
            this.errorObj.setInfoMsg = "Invalid Session";
            this.errorObj.status = 401;
            this.errorObj.send(this.httpResponse);
        }
    }

    getUserId() {
        return this.user_id;
    }

    getSessionId() {
        return this.session_id;
    }
};