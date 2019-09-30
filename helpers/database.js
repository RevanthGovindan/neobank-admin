import mongoose from 'mongoose'

export default class DataBase {
    constructor() {
        // this.url = process.env.MONGODB_URI ||
        //     'mongodb+srv://revanth:revanth@cluster0-553gh.mongodb.net/test?retryWrites=true&w=majority';
        //this.url = 'mongodb://localhost:27017/banking';
        this.url = process.env.DATABASE_URL;
        mongoose.Promise = global.Promise;
    }

    async connect() {
        await mongoose.connect(this.url, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
            .then(db => console.log('db connected'))
            .catch(err => console.log(err));
    }

    async disconnect() {
        try {
            await mongoose.connection.close();
        } catch (error) { }
    }
}