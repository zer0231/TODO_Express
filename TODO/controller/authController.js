const db = require('../middleware/db')

// SIGNUP START
module.exports.signup_get = (req,res)=>{
  res.render("create",{title:"create new user"})
}

module.exports.signup_post = (req,res)=>{
    var error_message = ""
    var success = ""
    var sql_insert = "Insert into user (name,username,email,password) VALUES(?,?,?,?)"
    var params = [req.body.full_name,req.body.username,req.body.email,req.body.password]
    db.run(sql_insert,params,function (err){
      if (err){
        console.log("error",err.message)
        error_message = err.message
        res.status(400).json({success:success,error:error_message})
      }else{
        success = "Success"
        console.log(success)
        res.cookie('u_id', this.lastID, { signed: true })
        .cookie('user_name',req.body.username,{signed: true})
        .status(200).json({success:success,error:error_message})
        
      }
    });
}
// SIGNUP END

// SIGNIN START
module.exports.signin_get = (req,res)=>{
  res.render("login",{title:"sign in"})
}

module.exports.signin_post = (req,res)=>{
  var error_message = ""
  var success = ""
  var sql_select = "SELECT * FROM user WHERE email = ? AND password = ? LIMIT 1"
  var params = [req.body.email,req.body.password]
  console.log(params)
  db.get(sql_select,params, (err,row)=>{
    if(row === undefined){
        error_message = "Login failed"
        res.status(400).json({success:success,error:error_message})
    }
    else{
      success = "success"
      res.cookie('u_id',row.u_id,{signed:true})
      .cookie('user_name',row.username,{signed:true})
      .status(200).json({success:success,error:error_message})
    }
  })
}

// SIGNIN END

module.exports.card_get = (req,res)=>{
  console.log(req.signedCookies['u_id'])
  var sql = "select * from card";
  db.all(sql, (err, rows) => {
    // console.log(rows)
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
        "message":"success",
        "data":rows
    })
  });
}