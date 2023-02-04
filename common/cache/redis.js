const ports = {
    local: 6379
};

export default {
    development: {
        default: {
            host: '127.0.0.1',
            port: ports.local,
            db: 0
        },
        mailVerification: {
            host: '127.0.0.1',
            port: ports.local,
            db: 1
        },
        resetPassword: {
            host: '127.0.0.1',
            port: ports.local,
            db: 2
        },
        postsActions:{
            host: '127.0.0.1',
            port: ports.local,
            db: 3
        }
    }
}[process.env.ENV || 'development']