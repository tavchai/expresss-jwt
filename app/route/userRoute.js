const userController = require('../controller/userController');
const express = require('express');
const route = express.Router();


route.post('/',userController.create);


module.exports = route;