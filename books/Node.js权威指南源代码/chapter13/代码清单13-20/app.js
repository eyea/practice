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
    var sqlStr="";
    for(var i=1;i<4;i++)
        sqlStr+="INSERT INTO "+tableName+"(username,firstname) values("+connection.escape("用户名"+i.toString())+","+connection.escape("姓"+i.toString())+");";
    connection.query(sqlStr,function(err,result){
        if(err) console.log("插入数据失败。");
        else{
            updateData();
        }
    });    
}
function updateData(){
   connection.query("update "+tableName+" set firstname =? where username=?", ["姓100","用户名2"],function(err,result){
        if(err) console.log("更新数据失败。");
        else{
            deleteData();
        }
    });    
}
function deleteData(){
    connection.query("delete from "+tableName+" where username=?",["用户名3"],function(err,result){
        if(err) console.log("删除数据失败。");
        else{
            queryData();
        }
    });    
}
function queryData(){
    connection.query("SELECT * FROM "+tableName,function(err,result){
        if(err) console.log('查询数据失败。');
        else{
            console.log(result);
            connection.end();
        }
    });
}