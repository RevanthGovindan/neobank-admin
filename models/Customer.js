import mongoose from 'mongoose';

let Customer = new mongoose.Schema({
    customer_name: {
        type: String
    },
    customer_email: {
        type: String
    },
    customer_id: {
        type: String
    }
}, { timestamps: { createdAt: true, updatedAt: false } });

export default mongoose.model('customer', Customer);