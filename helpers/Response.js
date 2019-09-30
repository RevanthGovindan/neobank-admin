import log4j from './log4j';

export default class Response {
    constructor() {
        this.status = 200;
        this.data = {};
        this.success = true;
        this.infoID = "001";
        this.infoMsg = "";
    }

    set setStatus(status) {
        this.status = status;
    }

    set setData(data) {
        this.data = data;
    }

    set setSuccess(result) {
        this.success = result;
    }

    set setInfoID(infoID) {
        this.infoID = infoID;
    }

    set setInfoMsg(msg) {
        this.infoMsg = msg;
    }

    send(response) {
        let responseData = {
            data: this.data,
            infoID: this.infoID,
            infoMsg: this.infoMsg
        }
        log4j.debug(JSON.stringify(responseData))
        response.status(this.status);
        response.send(responseData);
    }
}