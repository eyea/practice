  var data	={};
  	data.dbName = 'cms';		//数据库唯一名称
  	data.tbName = 'article';	//对象存储名称
	data.conn=function(callback){
		var rs = this,openDB;
			if(rs.result){	//判断数据库连接引用
				callback(rs.result);//存在则立刻回调
				return;
			}
			//不存在数据库连接则引用indexedDB接口
			rs.db = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
			//创建数据库
			openDB = rs.db.open(rs.dbName);
			//无数据库表 则创建
			openDB.onupgradeneeded = function(e){
				var rsDB = e.target.result;
					if(!rsDB.objectStoreNames.contains(rs.tbName)){//判断对象存储是否存在
					console.log("create objectStore(as table)");
					//创建对象存储，并且设置id为数据记录的自增唯一key
					var oStore = rsDB.createObjectStore(rs.tbName,{ keyPath: "id", autoIncrement:true });
					//为title字段创建索引
						oStore.createIndex("idx_title","title",{unique:false});
				}
			};
			openDB.onsuccess = function(e){
				var rsDB = e.target.result;
					rs.result = rsDB;
					callback(rsDB);//在连接数据库成功时回调
			}
	};
data.list = function(callback){
	var rs = this;
	rs.conn(function(result){
		//打开只读事务
		var tr = result.transaction([rs.tbName],"readonly");
		//获取指定对象存储
		var oStore = tr.objectStore(rs.tbName);
		//用游标方式打开所有记录
			oStore.openCursor().onsuccess = function(e){
				var rsDL = e.target.result;
				if(rsDL){	//无结果时为undefined
					//将每一条记录回传给callback去操作
					callback(rsDL.key,rsDL.value);
					//移动到下一条记录
					rsDL.continue();
				}
			};
	});
}
data.add = function(obj,callback){
	var rs = this;
		rs.conn(function(result){
			//打开一个可读可写的事务
			var tr = result.transaction([rs.tbName],"readwrite");
			//取得指定的对象存储
			var oStore = tr.objectStore(rs.tbName);
			//把obj对象插入对象存储
				oStore.add(obj).onsuccess=function(evt){
					obj.id = evt.target.result;
					//成功之后，返回当前记录信息给回调函数
					callback(obj);
				};
		});
};
data.del = function(id,callback){
	var rs = this;
		rs.conn(function(result){
			var tr = result.transaction([rs.tbName],"readwrite");
			var oStore = tr.objectStore(rs.tbName);
				oStore.delete(id);
				callback();
		});
};
data.edit = function(obj,callback){
	if(!obj.id){
		console.log('没有指定key id,无法定位修改数据')
		return;
	}
	var rs = this;
		rs.conn(function(result){
			var tr = result.transaction([rs.tbName],"readwrite");
			var oStore = tr.objectStore(rs.tbName);
				oStore.put(obj);
				callback();
		});
};
data.get = function(id,callback){
	var rs = this;
		rs.conn(function(result){
			//只读模式的事务就可以完成获取指定数据的任务
			var tr = result.transaction([rs.tbName],"readonly");
			var	oStore = tr.objectStore(rs.tbName);
			//获取指定id的数据
			var get = oStore.get(id);
				get.onsuccess = function( evt ) {
					//在成功获取的事件中将数据回调
					callback(evt.target.result);
				}
		});
};
	data.search = function(key,callback){
		var rs = this;
			rs.conn(function(result){
				var tr = result.transaction([rs.tbName],"readonly");
			    var oStore = tr.objectStore(rs.tbName);
				    oStore = oStore.index("idx_title");//获取索引对象存储集合
		    	oStore.openCursor().onsuccess = function(e){
		    		var rsDL = e.target.result;
		    			if(rsDL){//无结果时为undefined
		    				if(key){
		    					if(new RegExp(key).test(rsDL.key)){
				    				console.log(rsDL.value);
		    					}
		    				}else{
			    				console.log(rsDL.value);
		    				}
		    				rsDL.continue();
		    			}
		    	}
			});
	};


  var ui	={};
	//添加数据
	ui.add = function(){
		$("#tit").val('');//清空标题
		$("#inf").val('');//清空内容
		$("#btn").attr("k",0);//设置k属性为0表示添加新数据
	}
ui.dom = null;
ui.list=function(isClear){
	//获取操作对象
	var dom = ui.dom || $(".list ol");
	if(isClear){
		//清空旧有数据
		dom.empty();
	}
	data.list(function(id,item){
		dom.append('<li><a onclick="ui.del('+item.id+')">[删除]</a> <a onclick="ui.edit('+item.id+')">[编辑]</a> ['+ui.getTime(item.time)+'] '+item.title+'</li>');
	});
};
ui.update = function(){
	//通过k属性来判断是添加还是编辑
	var k = parseInt($("#btn").attr("k"));//keyPath的值是数据类型敏感的
	k||(function(){
		data.add({
			title	: $("#tit").val(),
			inf		: $("#inf").val(),
			time	: new Date()
		},function(item){
			var dom = ui.dom || $(".list ol");
				dom.append('<li><a onclick="ui.del('+item.id+')">[删除]</a> <a onclick="ui.edit('+item.id+')">[编辑]</a> ['+ui.getTime(item.time)+'] '+item.title+'</li>');
		});
	})();
	//如果k非0非空，就当作更新数据处理
	k&&(function(){
		data.edit({
			id		: k,
			title	: $("#tit").val(),
			inf		: $("#inf").val(),
			time	: new Date()
		},function(){
			ui.list(true);
		});
	})();
}
//编辑修改
ui.edit = function(id){
	//获取指定id的数据，回填至编辑框中，并且标示k为指定修改的id
	data.get(id,function(obj){
		$("#tit").val(obj.title);
		$("#inf").val(obj.inf);
		$("#btn").attr("k",id);
	});
}
ui.del = function(id){
	data.del(id,function(){
		ui.list(true);
	});
}
ui.getTime=function(t){
	return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();
}