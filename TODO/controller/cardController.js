const db = require('../middleware/db')


module.exports.index_get = (req,res)=>{
    var sql = "select * from card";
    var todo_cards = []
    var inprogress_cards = []
    var testing_cards = []
    var done_cards = []
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
                    
                }
                if(rows[i].status === 'testing' )
                {
                    testing_cards.push(rows[i]) 
                   
                }
                if(rows[i].status === 'done' )
                {
                    done_cards.push(rows[i]) 
                    
                }
            }
            console.log(rows)
            res.render('index',{title:"Home page",todo_cards:todo_cards, inprogress_cards:inprogress_cards,testing_cards:testing_cards,done_cards:done_cards,user_logged: req.signedCookies.user_name || "notlogged"})
  
        }
    });
}

module.exports.newCard_post = (req,res)=>{
    var sql_insert = "Insert into card (title,body,status,created_by) VALUES(?,?,?,?)"
    var params = [req.body.card_title,req.body.card_body,"todo",req.signedCookies.u_id]
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

module.exports.updateCards_post = (req,res)=>{
    console.log(req.body.length)
    for(var i=0;i<req.body.length;i++)
    {
        var order = i
        var id = req.body[i].id
        var status = req.body[i].status

        sql_update = 'update card set status = ? , c_order = ? where id = ?'
        params = [status,order,id]
        db.run(sql_update, params, function(err) {
            if (err) {
              return console.error(err.message);
            }
        });
        
    }
    res.status(200)
}