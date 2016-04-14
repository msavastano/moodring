var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Users = require('../models/users');

var ctrlUser = require('../controllers/user_controller');

/*POST new comment*/
router.post('/register', ctrlUser.register_user);

module.exports = router;
