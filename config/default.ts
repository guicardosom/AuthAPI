export default {
    port: 3000,
    mongoUri: 'mongodb://localhost:27017/auth-api',
    logLevel: 'info',
    // when deploying to production, these will not be used
    // use a proper smtp server, creds and set secure to true
    smtp: {
        user: 'mmdrbwlnptdaaxtp@ethereal.email',
        pass: 'EVvF1RUpFcncKBF3TV',
        host: 'smtp.ethereal.email', 
        port: 587, 
        secure: false
    }
}