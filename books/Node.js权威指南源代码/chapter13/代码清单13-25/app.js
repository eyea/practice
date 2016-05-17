var mysql = require('mysql');
var fs=require('fs');
var connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    database : 'mysql',
    user     : 'root',
    password : 'root',
});
var out=fs.createWriteStream('./message.txt');
out.on('error',function(err){
    console.log('写文件操作失败。错误信息为：'+err.message);
    process.exit();
});
connection.connect(function(err) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
        console.log('与MySQL数据库建立连接成功。');
        var query=connection.query('select * from users');
        query
        .on('error', function(err) {
            console.log('读取数据失败：错误信息为：'+err.message);
            process.exit();
        })
        .on('fields', function(fields) {
            var str=""; 
            fields.forEach(function(field){
                if(str!="")
                    str+=String.fromCharCode(9);
                str+=field.name;
            });
            out.write(str+'\r\n');
        })
        .on('result', function(row) {
            connection.pause();
            out.write(row.id+String.fromCharCode(9)+row.username+String.fromCharCode(9)+row.firstname+'\r\n',function(err){
                connection.resume();
            });            
        })
        .on('end', function() {
            console.log('数据全部写入完毕。');
            connection.end();
        });
    }
});