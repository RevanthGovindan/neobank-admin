import Sessions from '../../models/Sessions';
import SessionHandler from '../../helpers/SessionHandler';
import Response from '../../helpers/Response';
import ErrorHandler from '../../helpers/Errorhandler';
import { infoId } from '../../common/constants';

export default class Logout extends SessionHandler {
    constructor(request, httpResponse) {
        super();
        this.request = request;
        this.httpResponse = httpResponse;
        this.responseObj = new Response();
        this.errorObj = new ErrorHandler();
    }

    controller() {
        this.adminLogout();
    }

    adminLogout() {
        Sessions.updateOne(
            {
                session_id: this.getSessionId(),
                user_id: this.getUserId(),
            },
            {
                isActive: false
            }
        ).then((result) => {
            if (result.nModified !== 0) {
                this.responseObj.setInfoID = infoId.SUCCESS;
                this.responseObj.setInfoMsg = "Logout Success";
                this.responseObj.send(this.httpResponse);
            } else {
                throw new Error("Failed");
            }
        }).catch((error) => {
            this.errorObj.setInfoID = infoId.FAILED;
            this.errorObj.setInfoMsg = error.message;
            this.errorObj.send(this.httpResponse);
        });
    }
}