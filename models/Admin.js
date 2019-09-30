import mongoose from 'mongoose';

let Admin = new mongoose.Schema({
    admin_id: {
        type: String
    },
    admin_name:{
        type:String
    },
    admin_email: {
        type: String
    },
    admin_password: {
        type: String
    }
});

export default mongoose.model('admin', Admin);