const userController = require('../controller/userController');
const express = require('express');
const route = express.Router();


route.get('/',userController.findAll);
route.get('/email',userController.findByEmail);
route.post('/',userController.create);



module.exports = route;