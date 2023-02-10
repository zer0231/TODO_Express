var express = require('express');
const authController = require('../controller/authController');
var router = express.Router();

router.get('/create',authController.signup_get)
router.post('/create',authController.signup_post)
router.get('/test',authController.card_get)

router.get('/login',authController.signin_get)
router.post('/login',authController.signin_post)

module.exports = router;
