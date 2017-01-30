var User = require('../../models/user');
var crypto = require('crypto')
var jwt  = require('jsonwebtoken');

module.exports = function(app, middleware) {

    authenticateUser = function (req, res) {
        User.model.findOne({
            username: req.body.username
        }, function(err, user) {

            if (err) {
                res.status(400).json({ success: false, message: err });
            } else if (!user) {
                res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {
                if (!user.validatePassword(req.body.password)) {
                    res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    var token = jwt.sign(user, app.get('appSecret'), {
                        expiresIn: app.get('tokenExpiry')
                    });

                    res.json({ success: true, token: token });
                }   

            }
        });
    }

    app.post('/api/authenticate', authenticateUser);
};