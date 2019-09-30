import mongoose from 'mongoose';

let Session = new mongoose.Schema({
    session_id: {
        type: String
    },
    user_id: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: { createdAt: true, updatedAt: false, } });

export default mongoose.model('session', Session);