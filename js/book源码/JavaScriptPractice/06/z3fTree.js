(function(window){
	window.T = window.T || function(cfg){
		if (!(this instanceof T)) { return new T(cfg) };//省略new关键字调用
		this.SET = cfg;		//存储起来，让内部可以自由使用
		this.ROOT = null;	//记录根节点
	};
	/*静态方法*/
	T.extend = function(){/*合并对象*/
	    var len = arguments.length
	    	,obj = arguments[0]
	    	,tmp
	    if(!obj || typeof obj === "number" || obj.constructor !== Object){
	    	obj = {};
	    }
	    for (var i = 1; i < len; i++){
	    	tmp = arguments[i];
	    	if(tmp){
	    		for (var o in tmp){
	        		obj[o] = tmp[o];
	        	}
	    	}
	    }
	    return obj;
	};
	T.$ = function(id){//取得DOM元素
		return document.getElementById(id);
	}
	T.hasClass = function(el,cls){//判断是否包含某个class
		return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	};
	T.addClass = function(el,cls){//增加class
		if (!this.hasClass(el, cls)) el.className += " "+cls;
	};
	T.removeClass = function(el, cls) {//移除某个class
        if (this.hasClass(el, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    };
    T.find = function(el,target){//根据ClassName,tagName,ID查找
    	var target = target.replace(/#|\./g,"");//过滤掉ID,Class写法
    	var cd = el.children;	//获取元素子元素集合
    	for(var i=0;i<cd.length;i++){
    		var p = cd[i];
    		if(p.tagName.toLowerCase() === target.toLowerCase() || p.id === target || T.hasClass(p,target)) return p;
    	}
    	return null;
    };
	T.addListener = function(target,type,handler){//绑定事件
		if(target.addEventListener){
			target.addEventListener(type,handler,false);
		}else if(target.attachEvent){
			target.attachEvent("on"+type,handler);
		}else{
			target["on"+type]=handler;
		}
	};
	/*动态方法*/
var P = T.prototype;
	P.init = function(cfg){/*模板和配置文件的处理*/
		T.extend(this.SET,cfg||{});
		var set = this.SET,dic = set.data
		for(var i in dic){					//用来处理所属关系
			if(dic[i].pid !==undefined){	//判断指定pid的才处理
				var pid = dic[i].pid;
				if(dic[pid]){				//判断父类是否存在
					dic[pid].child || (dic[pid].child = []);//判断父类有无child，无则初始化
					dic[pid].child.push(i);	//登记到父类child中
				}
			}
		}
		this.addNode(T.$(this.SET.id),-1);
	};

	P.addNode = function(el,pid){/*在某个父节点下增加子节点*/
		if(this.ROOT === null) this.ROOT = pid;	//记录根id
		var ul = document.createElement("ul");	//创建一个ul元素
		var dic = this.SET.data;
		for(var i in dic){				//遍历数据
			if(dic[i].pid == pid){		//判断节点是否都是同一个父节点，即是否是当前需要显示的节点
				var dl 		= dic[i]			//取得一个节点的信息
				var child 	= dl.child && dl.child.length>0;	//判断是否还有子类
				var li 		= document.createElement("li");	//创建一个li元素
					li.innerHTML = '<span id="s'+i+'"></span><a href="'+dl.url+'" v="'+i+'">'+dl.cn+'</a>';//拼接html
					if(child){	
						this.addNode(li,i);				//递归下去
						this.setParentNodeEvent(li);			//设置父节点事件
					}
					this.setNodeClass(li,pid,child);	//设置节点样式
					this.setNodeEvent(li);				//设置节点事件
					ul.appendChild(li);		//把拼装好的li追加到ul中去
			}else{
				continue;				//继续下一个循环
			}
		}
		el.appendChild(ul);//插入到给定的元素中
	};
	P.setNodeClass = function(el,pid,child){
		var cls = "page";//默认子节点样式
		if(this.ROOT === pid){
			cls = "root";		//设置根节点样式
		}else if(child>0){
			cls = "open";		//设置父节点样式
		}
		T.addClass(el,cls);
	};
	P.setParentNodeEvent = function(el){
		var span = el.firstChild;//找到第一个子元素
		T.addListener(span,"click",function(){
			if(T.hasClass(el,"open")){
				T.removeClass(el,"open");
				T.addClass(el,"close");
			}else{
				T.removeClass(el,"close");
				T.addClass(el,"open");
			}
		});
	};
	P.setNodeEvent = function(el){
		var a = T.find(el,"a");
		var self = this;		//存储this对象
		T.addListener(a,"click",function(event){
			if(typeof self.SET.onclick === "function"){
				self.SET.onclick(event.srcElement||this);//这里的this和上面的this指向不同对象
			}
		});
	}
})(window);