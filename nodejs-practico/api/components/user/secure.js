const auth = require('../../../auth');

module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        switch(action) {
            case 'update':
                // El usuario que quiere modificar
                const owner = req.body.id;
                
                auth.check.own(req, owner);
                break;
            default:
                next();
        }
    }

    return middleware;
}

