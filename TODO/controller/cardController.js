const db = require('../middleware/db')


module.exports.index_get = (req,res)=>{
    var sql = "select * from card";
    var todo_cards = []
    var inprogress_cards = []
    db.all(sql, (err, rows) => {
        if (err) {
        res.status(400).json({"error":err.message});
        }else
        {
            for(var i=0;i<rows.length;i++)
            {
                if(rows[i].status === 'todo' )
                {
                   todo_cards.push(rows[i]) 
                }
                if(rows[i].status === 'inprogress' )
                {
                    inprogress_cards.push(rows[i]) 
                    console.log(rows[i])
                }
            }
            console.log(rows)
            res.render('index',{title:"Home page",todo_cards:todo_cards, inprogress_cards:inprogress_cards, user_logged: req.signedCookies.user_name || "notlogged"})
  
        }
    });
}

module.exports.newCard_post = (req,res)=>{
    var sql_insert = "Insert into card (title,body,status,created_by) VALUES(?,?,?,?)"
    var params = [req.body.card_title,req.body.card_body,"inprogress",req.signedCookies.u_id]
    var success = ""
    var error_message = ""
    db.run(sql_insert,params,function (err){
        if (err){
          console.log("error",err.message)
          error_message = err.message
          res.status(400).json({success:success,error:error_message})
        }else{
          success = "Success"
          console.log(success)
          res.status(200).json({success:success,error:error_message})
          
        }
    })
}