var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = require('../middleware/db')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test',function(req,res,next){
  
});

router.post('/new-card',function(req,res,next){
  var card_title = req.body.card_title
  var card_body = req.body.card_body
  console.log(card_title,card_body)
  res.send("success")
})

module.exports = router;
