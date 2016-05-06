eg.getDataList = function(min,max){//模拟构造数据，实际上这些数据由后端提供
	var lst = [],n=8;			//保存数据
	for(var i=0;i<n;i++){	//每次模拟n条
		var k = min + parseInt(Math.random()*(max-min));//随机指定范围的数
		lst.push(k+".jpg");	//拼接成字符串
	}
	return lst;				//返回数组
};
eg.cols = eg.getElementsByClassName("col");//把目标对象缓存起来
eg.colh = [0,0,0,0];						//存取每列的高度
eg.getColMin = function(){	//计算4列高度
	var min = 0,m = {};
	for(var i=0;i<4;i++){
		min = parseInt(eg.cols[i].offsetHeight);
		eg.colh[i] = min;
		m[min] = i;
	}
	return eg.cols[m[Math.min.apply(Array,eg.colh)]||0];//返回最小高度的对象
}
eg.add = function(dl){//追加数据的方法
	for(var i in dl){
		var newDiv = document.createElement("div")
		var newImg = document.createElement("img");
			newImg.src = dl[i];
			newDiv.appendChild(newImg);
			newDiv.innerHTML += '<p>['+dl[i]+']</p>';
			eg.getColMin().appendChild(newDiv);//追加到最小高度列里
	}
};
eg.scroll = function(){//滚动条事件处理
	window.onscroll = function(){//onscroll,onload,onresize只能这样添加
		var doc = document;
		var top = doc.documentElement.scrollTop || doc.body.scrollTop;		//滚动条到顶部的高度
		var winH = doc.documentElement.clientHeight||doc.body.clientHeight;	//可视窗口的高度
		if(Math.min.apply(Array,eg.colh) < top+winH){//如果最小高度小于可视区域，就补充
				eg.add(eg.getDataList(1,35));//随机获取数据，并追加到最后
		}
	}
}

eg.lazy = function(){
	var doc = document;
	var top = doc.documentElement.scrollTop || doc.body.scrollTop;		//滚动条到顶部的高度
	var winH = doc.documentElement.clientHeight||doc.body.clientHeight;	//可视窗口的高度
	var imgs = doc.getElementsByTagName("img");
	//对所有图片进行批量判断是否在浏览器显示区域内
	for(var i=0 ; i < imgs.length; i++){
		var _src = imgs[i].getAttribute('lzay-src');
		if( _src !== imgs[i].src ){					//判断图片是否已经显示过
			var _top = eg.getTop(imgs[i]);			//获取图片相对于顶部的位置
			if( _top >= top && _top <= top+winH){	//判断图片是否在显示区域内
				imgs[i].src = _src;
			}
		}
	}
}