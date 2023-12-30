require('dotenv').config();
import express from 'express';
import config from 'config';
import connectDatabase from './utils/connectDatabase';
import log from './utils/logger';
import router from './routes';

const app = express();

app.use(router);

const port = config.get('port');

app.listen(port, () => {
    log.info(`Server is running on port ${port}`);

    connectDatabase();
});