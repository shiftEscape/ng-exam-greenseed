var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

var middleware = {
  auth: require('../middleware/auth')
}

module.exports = function(app) {
  fs.readdirSync("./routes/api").forEach(function(file) {
    if (path.extname(file) === '.js') {
      return require("./api/" + file)(app, middleware);
    }
  });
};

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'User Management System v 1.0' });
// });

