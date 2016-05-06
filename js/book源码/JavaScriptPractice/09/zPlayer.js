var zPlayer=function(palyerwidth,selector){
    //获取视频节点
	var vBox			= $(selector);//自定义播放器的jQuery对象
	var vDom			= vBox.find("video");//系统播放元素的jQuery对象
     var dom			= vDom[0];//系统播放元素的DOM对象
	var voiceDom		= vBox.find(".voicekuai");//声音滑动块jQuery对象
	var voicekuaiDom	= vBox.find(".voicekuai");
	var currentDom		= vBox.find(".currentTime");//当前事件jQuery对象
	var allTimeDom	= vBox.find(".allTime");//总时长jQuery对象
	var startDom		= vBox.find(".startBar");//播放按钮jQuery对象
	var lineDom		= vBox.find(".line");//进度条jQuery对象
	var voicelineDom	= vBox.find(".voiceline");//声音背景jQuery对象
	var currentCircleDom= vBox.find(".currentCircle");//进度条移动块jQuery对象
	var isPlayLineDom	= vBox.find(".isPlayLine");//已播放进度条jQuery对象
	var fullBtnDom		= vBox.find(".fullBtn");//全屏窗口jQuery对象
	var uiplayDom		= vBox.find(".ui-play");//大播放按钮jQuery对象
	//计算进度条长度
    var lineLength		= palyerwidth-(vBox.find(".currentTime").width()*2)-10;
    var timeInterval	= null;
    (function(){
		//设置播放器宽度
		vBox.width(palyerwidth);
		vDom.width(palyerwidth);
		//初始化进度条的长度
		lineDom.width(lineLength);
		//设定音量值
		dom.volume=0.5;
		//初始化播放按钮居中
		uiplayDom.css({'left': (palyerwidth - uiplayDom.width())/2,'top':(vDom.height() - uiplayDom.height())/2 })
		voiceDom.css('left',voiceDom.position().left+40);
        //绑定加载总时长事件
		vDom.on("loadedmetadata",function(){
			allTimeDom.html(Convert(parseInt(dom.duration)));
		});
		//点击屏幕事件
		vDom.on("click",function(){
			PlaybackControl();
		});
		//播放停止单击事件
		startDom.click(function(){
			PlaybackControl();
		});
		//播放停止单击事件
		uiplayDom.click(function(){
			PlaybackControl();
		});
		//拖动时长事件
		lineDom.click(function(e){
			ChangeProcess(e);
		});
		//全屏点击事件
		fullBtnDom.click(function(){
			fullScreen(dom);
		});
		//声音点击事件
		voicelineDom.click(function(e){
			var old			= voicelineDom.position().left;
			var currentX	= e.pageX-old;
			dom.volume		= Math.round((100/45)*currentX)/100>1?1:Math.round((100/45)*currentX)/100;
			voiceDom.css('left',e.pageX+"px");
		});
        //进度条拖放程序
		(function(){
			var isDraging	= false;
			var _minX		= currentCircleDom.position().left;
			var _maxX		= allTimeDom.position().left
			var Start		= function(){
				$(document).bind("mousemove",function(e){
					if(isDraging){
						clearInterval(timeInterval);
						if(e.pageX<_minX||e.pageX>_maxX){return false;}
						currentCircleDom.css({"left":e.pageX+"px"});
						isPlayLineDom.width((e.pageX - isPlayLineDom.position().left)+"px");
					}
				});
				$(document).bind("mouseup",function(e){
					if(isDraging){
						$(document).unbind("mousemove");
						isDraging=false;
						ChangeProcess(e);
					}
				});
				isDraging	= true;//鼠标按下时，标示可以拖动
			};
			currentCircleDom.on("mousedown",Start);
		})();
        //声音拖放
        (function(){
            var _minXX			= voicekuaiDom.position().left-24;
            var _maxXX			= _minXX+45;
            var isVoiceDraging	= false;
            var Start			= function(){
                $(document).bind("mousemove",function(e){
                    if(isVoiceDraging){
                        if(e.pageX<_minXX||e.pageX>_maxXX){return false;}
                        var currentX	= e.pageX-_minXX;
                        voicekuaiDom.css({"left":e.pageX+"px"});
                        dom.volume		= (100/45)*currentX/100;
                    }
                });
                $(document).bind("mouseup",function(e){
                    if(isVoiceDraging){
                        $(document).unbind("mousemove");
                        isVoiceDraging=false;
                    }
                });
                isVoiceDraging = true;
            };
            voicekuaiDom.on("mousedown",Start);
        })();
    })();
	//全屏操作
	var fullScreen = function(el){
		var pfix		= ['webkit','moz','o','ms','khtml'];
		var fix			= '';
		for(var i=0;i<pfix.length;i++){
			if(typeof document[pfix[i] + 'CancelFullScreen' ] != 'undefined'){
				fix = pfix[i];
				break;
			}
		}
		if(fix === ''){ alert('浏览器不支持!'); }
		el[fix + 'RequestFullScreen']();
	};
    //播放视频
    var startVideo=function(){
       dom.play();
       timeInterval	= setInterval(function(){
		   //根据时间计算进度条位置
           var currentLine	= parseInt(dom.currentTime)*((lineLength-12)/parseInt(dom.duration));
		   //显示当前播放时间
           currentDom.html(Convert(dom.currentTime));
		   //移动进度条位置
           isPlayLineDom.width(currentLine+4);
           currentCircleDom.css("left",currentLine + isPlayLineDom.position().left+"px");
		   //如果播放完毕则重置
           if(dom.ended) EndVideo();
       },500);
    };
    //播放结束后的方法
    var EndVideo=function(){
        changeStatus(true);
        currentDom.html("00:00:00");
        isPlayLineDom.width(0);
        currentCircleDom.css("left",lineDom.position().left+2);
        clearInterval(timeInterval);
    };
    //暂停视频
    var stopVideo=function(){
        dom.pause();
        clearInterval(timeInterval);
    };
    //改变播放器的状态
    var changeStatus=function(bool){
        if(dom.paused&&!bool){
           startDom.find("img").attr("src","Images/start.jpg");
		   uiplayDom.hide()
		}else{
           startDom.find("img").attr("src","Images/stop.jpg");
		   uiplayDom.show();
		}
    };
    //播放暂停按钮
    var PlaybackControl=function(){
        changeStatus(false);
        if(dom.paused)
            startVideo();
        else
            stopVideo();
    };
    //Change进度条
    var ChangeProcess=function(e){
        stopVideo();
        var positionRelative=parseInt(e.pageX - lineDom.position().left);
        dom.currentTime=(positionRelative/(lineLength))*dom.duration;
        changeStatus();
        startVideo();
    };
    //将秒转换为时分秒的格式
    var Convert=function(seconds){
        var hh,mm,ss;
        //传入的时间为空或小于0
        if(seconds==null||seconds<0) return;
        //得到小时
        hh		= seconds/3600|0;
        seconds	= parseInt(seconds)-hh*3600;
        if(parseInt(hh)<10) hh="0"+hh;
        //得到分
        mm		= seconds/60|0;
        //得到秒
        ss		= parseInt(seconds)-mm*60;
        if(parseInt(mm)<10) mm="0"+mm;
        if(ss<10) ss="0"+ss;
        return hh+":"+mm+":"+ss;
    };
};