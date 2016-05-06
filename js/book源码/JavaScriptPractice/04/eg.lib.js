var eg = {};
	eg.$ = function(id){
		return document.getElementById(id);
	};
	eg.getElementsByClassName = function(className, element) {
		if(document.getElementsByClassName){
			return (element || document).getElementsByClassName(className)
		}
		var children = (element || document).getElementsByTagName('*');
		var elements = [];	 
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			var classNames = child.className.split(' ');
			for (var j = 0; j < classNames.length; j++) {
				if (classNames[j] == className) {
					elements.push(child);
					break;
				}
			}
		}
		return elements;
	};
	eg.addListener = function(target,type,handler){
		if(target.addEventListener){
			target.addEventListener(type,handler,false);
		}else if(target.attachEvent){
			target.attachEvent("on"+type,handler);
		}else{
			target["on"+type]=handler;
		}
	};
	//定义一个公用的AJAX请求函数
	eg.AJAX = function(config,callback){	//接受一个回调函数和一个配置参数
		var xmlhttp;	//定义一个变量用于后面存储对象
		if(window.XMLHttpRequest){//如果浏览器支持XMLHttpRequest对象，通常非IE浏览器支持
			xmlhttp = new XMLHttpRequest();
		}else if(window.ActiveXObject){//如果浏览器支持ActiveXObject对象，通常是IE
			try {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");//尝试创建一个低版本对象，msxml组件2.6版本以下支持
			}
			catch (e){
				try {
					xmlhttp = new ActiveXObject("msxml2.XMLHTTP");//尝试创建一个高版本对象，msxml组件3.0版本以上支持
				}
				catch (x){
				}
			}
		}
		if(xmlhttp){//如果能够创建成功，一般都会成功，如果还不行，这系统就重装吧！太古老了。
			if(config.ISASYN){
				xmlhttp.onreadystatechange = function(){//定义HTTP状态发生改变时执行的函数
					if (xmlhttp.readyState==4 && xmlhttp.status==200){//当HTTP请求成功时
						callback(xmlhttp.responseText,xmlhttp.responseXML);//把服务器响应的数据回传给回调函数callback
					}
				};
				xmlhttp.open(config.TYPE,config.URL,true);//将传递的参数给open方法调用
				xmlhttp.send(config.DATA);//发送异步AJAX请求
			}else{
				xmlhttp.open(config.TYPE,config.URL,false);//将传递的参数给open方法调用
				xmlhttp.send(config.DATA);//发送同步AJAX请求
				callback(xmlhttp.responseText,xmlhttp.responseXML);
			}
		}
	};