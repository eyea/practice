var express = require('express');
var mysql = require('mysql');
var app = express();
var pool = mysql.createPool({
    host     : 'localhost',
    port     : 3306,
    database : 'mysql',
    user     : 'root',
    password : 'root',
});
app.use(express.basicAuth(function(user,pass,callback) {
    pool.getConnection(function(err, connection) {
        if(err){connection.release();callback(null,false);}
        else{
            connection.query('SELECT count(1) count FROM users where userName=? and passWord=?',[user,pass],function(err,result){
                    if(err) {connection.release();callback(null,false);}
                    else{
                        connection.release();
                        if(result[0].count>0){callback(null,true);}  
                        else callback(null,false);                   
                    }
            });
        }
    });
}));
app.get('/', function(req, res) {
   res.send('你好');
});
app.listen(1337, "127.0.0.1");
