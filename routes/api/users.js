var User = require('../../models/user');

module.exports = function(app, middleware) {
    
    getAllUsers = function(req, res) {
        User.find({}, function(err, users) {
            res.json(users);
        });
    };

    getUser = function(req, res) {
        var id = req.params.id;
    };
    
    app.get('/api/users', [middleware.auth.requireToken], getAllUsers);
    app.get('/api/users/:id', [middleware.auth.requireToken], getUser);
};
