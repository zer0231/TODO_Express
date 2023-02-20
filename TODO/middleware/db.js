var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            u_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            username text UNIQUE,
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email),
            CONSTRAINT username_unique UNIQUE (username)
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log(err.message)
            }
        });  
        db.run(`CREATE TABLE card(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            c_order INTEGER Default 0,
            title text,
            body text,
            status text,
            created_by INTEGER,
            FOREIGN KEY(created_by) REFERENCES user(u_id)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log(err.message)
            }
        });  
        
    }
});


module.exports = db
