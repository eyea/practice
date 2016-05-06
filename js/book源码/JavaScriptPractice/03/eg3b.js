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
	//定义数据
	eg.data = [
		["photo01.jpg","thumb01.jpg"]
		,["photo02.jpg","thumb02.jpg"]
		,["photo03.jpg","thumb03.jpg"]
		,["photo04.jpg","thumb04.jpg"]
		,["photo05.jpg","thumb05.jpg"]
		,["photo06.jpg","thumb06.jpg"]
		,["photo07.jpg","thumb07.jpg"]
		,["photo01.jpg","thumb01.jpg"]
		,["photo02.jpg","thumb02.jpg"]
		,["photo03.jpg","thumb03.jpg"]
		,["photo04.jpg","thumb04.jpg"]
		,["photo05.jpg","thumb05.jpg"]
		,["photo06.jpg","thumb06.jpg"]
		,["photo07.jpg","thumb07.jpg"]
	];
	eg.showNumber = 0;		//默认显示
	eg.groupNumber = 1;		//当前显示的组
	eg.groupSize = 6;		//每组的数量
	eg.showThumb = function(group){
		var ul = eg.$("smallPhotosList");
			ul.innerHTML = '';
		var start = (group-1)*eg.groupSize;
		var end = group*eg.groupSize
		for(var i=start;(i<end&&i<eg.data.length);i++){
			var li = document.createElement("li");
				li.innerHTML = '<img src="'+eg.data[i][1]+'" id="thumb'+i+'" width="80" height="40"/>';
				(function(i){
					eg.addListener(li,"click",function(){
						eg.showNumber = i;
						eg.showBig();
					});
				})(i);
			ul.appendChild(li);
		}
	};
	eg.showBig = function(){
		eg.$("bigPhotoSrc").src = eg.$("thumb"+eg.showNumber).src.replace("thumb","photo")
	};
	(function(){})();
	eg.init = function(){
		eg.showThumb(1);		//初始化要显示的
		eg.addListener(eg.$("next"),"click",function(){
			eg.nextThumb();
		});
		eg.addListener(eg.$("prve"),"click",function(){
			eg.prveThumb();
		});
		eg.addListener(document,"keyup",function(e){
			e = e || event;
			if(e.keyCode == 37){
				eg.prvePhoto();
			}
			if(e.keyCode == 39){
				eg.nextPhoto();
			}
		});
	};
	eg.init();
	eg.nextThumb = function(){
		if((eg.groupNumber*eg.groupSize) +1 <= eg.data.length){
			eg.showThumb(eg.groupNumber+1);
			eg.showNumber = eg.groupNumber*eg.groupSize;
			eg.showBig();
			eg.groupNumber++;
		}
	};
	eg.prveThumb = function(){
		if(eg.groupNumber - 1>=1){
			eg.showThumb(eg.groupNumber-1);			
			eg.groupNumber--;
			eg.showNumber = eg.groupNumber*eg.groupSize-eg.groupSize;		
			eg.showBig();
		}
	};
	eg.nextPhoto = function(){
		if(eg.showNumber%eg.groupSize == (eg.groupSize-1)){
			eg.nextThumb()
		}else if(eg.showNumber<eg.data.length-1){
			eg.showNumber++;
			eg.showBig();
		}
	};
	eg.prvePhoto = function(){
		if(eg.showNumber == ((eg.groupNumber-1)*eg.groupSize)){
			eg.prveThumb()
		}else if(eg.showNumber>0){
			eg.showNumber--;
			eg.showBig();
		}
	};