var express = require('express');
var router = express.Router();
const userController = require('../controllers/users')

router.post('/',userController.user_register)

module.exports = router;
