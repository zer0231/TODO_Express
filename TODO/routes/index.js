var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = require('../middleware/db')
const cardController = require('../controller/cardController')

/* GET home page. */
router.get('/', cardController.index_get);

router.get('/test',function(req,res,next){
  
});

router.post('/new-card',cardController.newCard_post)

module.exports = router;
