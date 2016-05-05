### 手机端的我一般是量出尺寸/2 ranhou 找换算的rem

### 通过引入的js来计算：如下部分

    // 适应屏幕宽度
    function autoWidth() {
        var docEle = document.documentElement,
            initWidth = 320, initSize = 100,
            resizeEvent = 'orientationchange' in window ?'orientationchange' : 'resize';

        var container = document.getElementById('wrapper');

        function init(win) {
          var w = win.innerWidth,
              h = win.innerHeight;

          docEle.style.fontSize = w / initWidth * initSize + 'px';
          container.style.height = h + 'px';
        }

        window.addEventListener('orientationchange', function(e) {
          e.preventDefault();
          if (Math.abs(window.orientation) === 90) {
            alert('为了您更好的体验，请不要使用横屏浏览');
          }
        }, false);

        window.addEventListener(resizeEvent, function(e) {
          init(window);
        }, false);

        init(window);
    }
    <!-- 320/100是基准
		 320屏幕宽度，对应100px
		 所以，1rem就是100px
		 然后iphone6比较宽，应该是117px
		 去哪儿用的就是这个换算
     -->

     <!-- 
     rem针对的是html标签
     发现html这个标签是有font  size的
     用js设置的
      -->

### rem是相对于根元素
### em是相对于父元素

	你也可以把320对应成1，10，100都可以
	只不过，你对应成1的时候
	1rem就是1px了

	如果她的设计稿是按苹果6来做的
	js就可以把320换成375了
	苹果6的宽度是375

## 设计稿是按照什么标准来的，咱们就把它的基准设置一下

	量取页面的时候，比如某个btn的宽度是320乘以120
	就写成1.6rem和0.6rem
	如果她直接按照320来设计的，那咱们就不用除以2了

	按理说应该给所有设计到字体的地方，都单独加样式的