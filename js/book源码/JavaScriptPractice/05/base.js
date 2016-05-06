(function(self){
	if(window.eg === undefined){
		window.eg = self(window,document);
	}
})(function(window,document){
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
		eg.getTop = function(El){
             var top = 0;
             do{
                 top += El.offsetTop;//计算Top值
             }while((El = El.offsetParent).nodeName != 'BODY');//获取到body节点为止
             return top;
         };
	return eg;
});

