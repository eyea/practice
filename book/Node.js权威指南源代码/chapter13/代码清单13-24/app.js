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
        connection.query('select genres.id,genres.name,books.id,books.genreid,books.name from genres inner join books on genres.id=books.genreid',function(err,result){
        //connection.query('select genres.id,genres.name,books.id id1,books.genreid,books.name name1 from genres inner join books on genres.id=books.genreid',function(err,result){
        //connection.query({sql:'select genres.id,genres.name,books.id,books.genreid,books.name from genres inner join books on genres.id=books.genreid',nestTables:true},function(err,result){
        //connection.query({sql:'select genres.id,genres.name,books.id,books.genreid,books.name from genres inner join books on genres.id=books.genreid',nestTables:'_'},function(err,result){
            if(err) console.log('查询数据失败。');
            else{
                console.log(result);
                connection.end();
            }
        });
    }
});