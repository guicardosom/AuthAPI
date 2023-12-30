import mongoose from 'mongoose';
import config from 'config';
import log from './logger';

async function connectDatabase() {
    const mongoUri = config.get<string>('mongoUri');

    try {
        await mongoose.connect(mongoUri);
        log.info('Connected to database');
    } catch (error: any) {
        console.log((error as Error).message);
        process.exit(1);
    }
}

export default connectDatabase;