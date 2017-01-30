var User = require('../../models/user');

module.exports = function(app, middleware) {

    createUser = function(req, res) {
        User.createUser(req.body, function(err, createdUser) {
            if(err) {
                res.status(400).json({success: false, message: err})
            } else {
                res.status(201).json({success: true, _id: createdUser._id})
            }
        });
    };

    getAllUsers = function(req, res) {
        User.model.find({}, '-salt -password', function(err, users) {
            res.json(users);
        });
    };

    getUser = function(req, res) {
        User.model.find({_id: req.params.id}, '-salt -password', function(err, user) {
            if(err) {
                res.status(400).json({success: false, message: err, data: []})
            } else {
                res.status(200).json({success: true, data: user});
            }
        });
    };
    
    app.post('/api/users', createUser);
    app.get('/api/users', [middleware.auth.requireToken], getAllUsers);
    app.get('/api/users/:id', [middleware.auth.requireToken], getUser);
};
