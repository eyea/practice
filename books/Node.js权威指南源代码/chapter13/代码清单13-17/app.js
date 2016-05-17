var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    database : 'mysql',
    user     : 'root',
    password : 'root',
});
var pool  = mysql.createPool({
    host     : 'localhost',
    port     : 3306,
    database : 'mysql',
    user     : 'root',
    password : 'root',
});
function handleDisconnect(){
    connection.connect(function(err) {
        if(err) console.log('与MySQL数据库建立连接失败。');
        else{
            console.log('与MySQL数据库建立连接成功。');   
        }
    });
}

connection.on('error', function(err) {
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        console.log('与MySQL数据库之间的连接被丢失。');
        setTimeout(function(){            
            handleDisconnect(); 
        },10000);                       
    } 
    else {                                      
        throw err;                                  
    }
});
handleDisconnect();