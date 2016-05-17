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
        connection.end(function(err) {
            if(err) console.log('关闭MySQL数据库操作失败。');
            else{
                console.log('关闭MySQL数据库操作成功。');
            }
        });
    }
});
