var sql = require("msnodesql")
	//链接数据的字符串
	,conn_str = "Driver={SQL Native Client};Server={127.0.0.1,7788};Database={nodetest};uid=sa;PWD=123;";
	sql.open(conn_str, function (err, conn) {
		if (err){//如果链接出错则退出
			console.log(err);return;
		}
		console.log('open ok...');
		conn.query("insert into [user] ([name])values('nodejs')");
		conn.query("insert into [user] ([name])values('z3f')");
		conn.query("select * from [user] where [name] = 'z3f'",function(err,result){
			console.log("query ok...");
			console.log(result);
			for(var i=0;i<result.length;i++){
				console.log(result[i].name); //遍历输出查询到的结果集
			}
		});
	});