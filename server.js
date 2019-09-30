import express from 'express';
import router from './routes';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import * as app from './app';
import DataBase from './helpers/database';

const server = express();
const port = process.env.APP_PORT;
const db = new DataBase();

//body parse for post and put
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//cors
server.use(app.cors);
server.use(app.intercept);

//for decryption
server.post("*", app.handleDecryption);
server.put("*", app.handleDecryption);

//swagger
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use("/", router);

db.connect().then(async () => {
    server.listen(port, () => {
        console.log('Server is up and running on port number ' + port);
    });
});
