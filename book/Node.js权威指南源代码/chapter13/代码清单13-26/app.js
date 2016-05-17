var mysql = require('mysql');
var pool = mysql.createPool({
    host     : 'localhost',
    port     : 3306,
    database : 'mysql',
    user     : 'root',
    password : 'root',
});
pool.getConnection(function(err, connection) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
        console.log('与MySQL数据库建立连接成功。');
        connection.query( 'select * from users', function(err, rows) {
            if(err) console.log('查询数据操作失败。');
            else{
                console.log(rows);
                pool.end();
            }
        });
    }
});

