var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    database : 'mysql',
    user     : 'root',
    password : 'root',
});

connection.connect(function(err) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
        console.log('与MySQL数据库建立连接成功。');
        connection.query('INSERT INTO users SET ?',{username:'凌牛',firstname:'陆'},function(err,result){
            if(err) console.log('插入数据失败。');
            else{
                connection.query('SELECT * FROM ??',['users'],function(err,result){
                    if(err) console.log('查询数据失败。');
                    else{
                        console.log(result);
                        connection.end();
                    }
                });
            }
        });
    }
});