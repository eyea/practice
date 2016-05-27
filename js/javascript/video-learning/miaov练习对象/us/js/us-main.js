/*
	us-main.js	
	版本号：
			1.1.1 	created by yancey qq:1352667433	

*/

$(function(){
			/*返回顶部*/
			var $oReturn = $('#return');
			var iTimer = null;	
			var b = 0;	//用来去除滚动事件

			setTop();

			$(window).scroll(function(){
				if (b != 1) {//如果b=1那么，当前的scroll事件是被定时器所触发，如果不等于1，那么就是非定时器的其他任何一个操作触发该事件
					clearInterval(iTimer);
				}	
				b = 2;		
				setTop();
			})
			$oReturn.click(function() {
				clearInterval(iTimer);
				var iCur = iSpeed = 0;
				iTimer = setInterval(function() {
					//当前滚动的高度
					iCur = $(document).scrollTop()
					//设置速度
					iSpeed = Math.floor( ( 0 - iCur ) / 8 );
					//如果当前的滚动条到顶部了
					if ( iCur == 0 ) {
						clearInterval(iTimer);
					} else {
						//否则运动
						$(document).scrollTop(iCur + iSpeed);
					}
					b = 1;	//标记定时器触发的
				}, 30);
			});
			//设置高度，让盒子永远在底部
			function setTop(){
				//获取滚动的高度
				var $scrollTop = $(document).scrollTop(); 
				//当前滚动的高度加上可视区的高度加上盒子的高度

				var rtop =  $scrollTop + $(window).height() - $oReturn.height() + (-50); 
				$oReturn.css('top', rtop)
			}


			/*评论框宽度*/
			var $offsetW = $('.critic-content .user').outerWidth() + 38;
			var $criticW = $('.critic-content .option').innerWidth();
			$('.critic .msg').outerWidth($criticW-$offsetW);
			console.log($offsetW);


			/*底部分页居中*/
			var $pW = $('.pagination').width();
			$('.pagination').css('left',-$pW/2);
	
});