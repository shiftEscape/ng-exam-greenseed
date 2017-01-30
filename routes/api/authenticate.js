var User = require('../../models/user');
var jwt  = require('jsonwebtoken');

module.exports = function(app, middleware) {

    authenticateUser = function (req, res) {
        User.findOne({
            username: req.body.username
        }, function(err, user) {

            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {
                
                if (user.password != req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    var token = jwt.sign(user, app.get('appSecret'), {
                        expiresIn: 60*60*24
                    });

                    res.json({ success: true, token: token });
                }   

            }
        });
    }

    app.post('/api/authenticate', authenticateUser);
};