import mongoose from 'mongoose';

let CustomerAuthentication = new mongoose.Schema({
    customer_id: {
        type: String
    },
    mpin: {
        type: String
    }
});

export default mongoose.model('customerauthentication', CustomerAuthentication);