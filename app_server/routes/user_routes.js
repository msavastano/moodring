var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Users = require('../models/users');
var ctrlUser = require('../controllers/user_controller');


/*POST registration info*/
router.post('/register', ctrlUser.register_user);

/*GET registration page*/
router.get('/register', ctrlUser.register_page);

/*POST login credentials*/
router.post('/login', ctrlUser.login_user);

/*GET login page*/
router.get('/login', ctrlUser.login_page);

/*GET login page*/
router.get('/logout', ctrlUser.logout);

module.exports = router;
