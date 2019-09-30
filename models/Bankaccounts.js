import mongoose from 'mongoose';

let Bankaccount = new mongoose.Schema({
    account_id: {
        type: String
    },
    account_type: {
        type: String
    },
    customer_id: {
        type: String
    },
    balance: {
        type: Number,
        validate: {
            validator: (balance) => {
                if (balance < 0) {
                    return false
                } else {
                    return true
                }
            },
            msg: "Add valid fund"
        }
    },
    customer_name: {
        type: String
    }
});

export default mongoose.model('bankaccount', Bankaccount);