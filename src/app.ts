require('dotenv').config();
import express from 'express';
import config from 'config';
import connectDatabase from './utils/connectDatabase';
import log from './utils/logger';

const app = express();

const port = config.get('port');

app.listen(port, () => {
    log.info(`Server is running on port ${port}`);

    connectDatabase();
});