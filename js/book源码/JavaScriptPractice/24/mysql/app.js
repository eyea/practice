var mysql = require("mysql");  //引用模块
var client = mysql.createConnection({ //创建连接
    "host":"localhost",
    "port":"3306",
    "user":"root",
    "password":"123123@"
});
client.query("USE test",function(error,results){
	if(error){//出错时退出
		console.log("ClientConnectionReady Error:"+error.message);
		client.end();return;
	}
	InsertData(client);
});
//插入数据
InsertData=function(){
    var values=["Hello!","node 2 mysql at:"+Math.random()];
		client.query("INSERT INTO node SET title=?,info=?",values,function(error,results){
			if(error){//出错时退出
				console.log("InsertData Error:"+error.message);
				client.end();return;
			}
			console.log("Inserted: "+results.affectedRows+" row.");
			console.log("Id inserted: "+results.insertId);
		});
    GetData(client);
};
//查询数据
GetData=function(client){
    client.query("SELECT * FROM node",function(error,results,fields){
            if(error){//出错时退出
                console.log("GetData Error:"+error.message);
                client.end();return;
            }
            console.log("Results:");
            console.log(results);//控制台输出记录集
            if(results.length>0){
                var rs = results[0];//取得第一条记录
                console.log("Title:"+rs.title);//输出指定字段
                console.log("info:"+rs["info"]);
            }
        }
    );
    client.end();//关闭数据库连接
    console.log("Connection closed.");
}; 