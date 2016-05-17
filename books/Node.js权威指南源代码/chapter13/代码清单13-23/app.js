var mysql = require('mysql');
var tableName="users";
var connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    database : 'mysql',
    multipleStatements: true,
    user     : 'root',
    password : 'root',
});
connection.connect(function(err) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
        console.log('与MySQL数据库建立连接成功。');
        insertData();
    }
});
function insertData(){
    var sqlStr="call insertuser('凌牛','陆');";
    connection.query(sqlStr,function(err,result){
        if(err) console.log("插入数据失败。");
        else{
            console.log(result[0]);
        }
        connection.end();
    });    
}
