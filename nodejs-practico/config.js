module.exports = {
    api: {
        port: process.env.PORT || 3000
    },
    jwt: {
        secrect: process.env.JWT_SECRET || 'notasecret!'
    }
}