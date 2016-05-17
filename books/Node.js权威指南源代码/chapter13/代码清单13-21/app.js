var mysql = require('mysql');
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
    var sqlStr="call insertuser('凌牛','陆',@successFlag);select @successFlag;";
    connection.query(sqlStr,function(err,result){
        if(err) console.log("插入数据失败。");
        else{
            if(result[1][0]["@successFlag"]=="1")
                console.log("插入数据成功。");
            else
                 console.log("插入数据失败。");
        }
        connection.end();
    });    
}
