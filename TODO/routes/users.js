var express = require('express');
const authController = require('../controller/authController');
var router = express.Router();

router.get('/create',authController.signup_get)
router.post('/create',authController.signup_post)
router.get('/test',authController.card_get)

router.get('/login',authController.signin_get)
router.post('/login',authController.signin_post)

router.get('/logout',(req,res)=>{
  res.clearCookie('user_name')
  res.clearCookie('u_id')
  res.redirect('/')
})

module.exports = router;
