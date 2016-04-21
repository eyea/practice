# CSS3 简介
* 对CSS3已完全向后兼容，所以你就不必改变现有的设计。浏览器将永远支持CSS2。

## CSS3 模块
* CSS3被拆分为"模块"。旧规范已拆分成小块，还增加了新的。
* 一些最重要CSS3模块如下：
	- 选择器
	- 盒模型
	- 背景和边框
	- 文字特效
	- 2D/3D转换
	- 动画
	- 多列布局
	- 用户界面

## 边框
* border-radius
* box-shadow:10px 10px 5px #888888;
* border-image(_私有属性—_注意浏览器的兼容)：
	- -o-border-image:url(border.png) 30 30 round; /* Opera */
	- round 是图像平铺填充
	- stretch 图像被拉伸以填充该区域。
* background-size:80px 60px;
	- body{background-image:url(img_flwr.gif),url(img_tree.gif);

## background-clip 属性
* div{background-color:yellow;background-clip:content-box;}指定绘图区的背景
	值	说明
	border-box	默认值。背景绘制在边框方框内（剪切成边框方框）。
	padding-box	背景绘制在衬距方框内（剪切成衬距方框）。
	content-box	背景绘制在内容方框内（剪切成内容方框）。


## background-origin 属性
#### 内容框相对定位的背景图片：
* div{background-image:url('smiley.gif');background-repeat:no-repeat;background-position:left;background-origin:content-box;}
* background-Origin属性指定background-position属性应该是相对位置。

# 渐变（Gradients） 
## CSS3 定义了两种类型的渐变（gradients）： (注意浏览器支持)
* 线性渐变（Linear Gradients）- 向下/向上/向左/向右/对角方向
* 径向渐变（Radial Gradients）- 由它们的中心定义
### 语法： background: linear-gradient(direction, color-stop1, color-stop2, ...);
	1._从左边开始的线性渐变。起点是红色，慢慢过渡到蓝色_
	#grad1 {
    	height: 200px;
    	background: -webkit-linear-gradient(left, red , blue); /* Safari 5.1 - 6.0 */
    	background: -o-linear-gradient(right, red, blue); /* Opera 11.1 - 12.0 */
    	background: -moz-linear-gradient(right, red, blue); /* Firefox 3.6 - 15 */
    	background: linear-gradient(to right, red , blue); /* 标准的语法（必须放在最后） */
    2.从左上角开始（到右下角）的线性渐变。起点是红色，慢慢过渡到蓝色
    #grad1 {
    	height: 200px;
    	background: -webkit-linear-gradient(left top, red , blue); /* Safari 5.1 - 6.0 */
    	background: -o-linear-gradient(bottom right, red, blue); /* Opera 11.1 - 12.0 */
    	background: -moz-linear-gradient(bottom right, red, blue); /* Firefox 3.6 - 15 */
    	background: linear-gradient(to bottom right, red , blue); /* 标准的语法（必须放在最后） */
		}
	3.使用角度
		#grad {
		  background: -webkit-linear-gradient(180deg, red, blue); /* Safari 5.1 - 6.0 */
		  background: -o-linear-gradient(180deg, red, blue); /* Opera 11.1 - 12.0 */
		  background: -moz-linear-gradient(180deg, red, blue); /* Firefox 3.6 - 15 */
		  background: linear-gradient(180deg, red, blue); /* 标准的语法 */
		}	
	4.repeating-linear-gradient() 函数用于重复线性渐变
* 径向渐变
	- background: radial-gradient(center, shape size, start-color, ..., last-color);
	- #grad {
  		background: -webkit-radial-gradient(red 5%, green 15%, blue 60%); /* Safari 5.1 - 6.0 */
  		background: -o-radial-gradient(red 5%, green 15%, blue 60%); /* Opera 11.6 - 12.0 */
  		background: -moz-radial-gradient(red 5%, green 15%, blue 60%); /* Firefox 3.6 - 15 */
  		background: radial-gradient(red 5%, green 15%, blue 60%); /* 标准的语法 */
		}
	- 设置形状
		- shape 参数定义了形状。它可以是值 circle 或 ellipse。其中，circle 表示圆形，ellipse 表示椭圆形。默认值是 ellipse。
		- #grad {
  			background: -webkit-radial-gradient(circle, red, yellow, green); /* Safari 5.1 - 6.0 */
  			background: -o-radial-gradient(circle, red, yellow, green); /* Opera 11.6 - 12.0 */
  			background: -moz-radial-gradient(circle, red, yellow, green); /* Firefox 	3.6 - 15 */
  			background: radial-gradient(circle, red, yellow, green); /* 标准的语法 */
			}

# CSS3 2D 转换
* Internet Explorer 10, Firefox, 和 Opera支持transform 属性.
* Chrome 和 Safari 要求前缀 -webkit- 版本.
* 注意： Internet Explorer 9 要求前缀 -ms- 版本.
  - 2D变换方法：
	- translate()
		- translate()方法，根据左(X轴)和顶部(Y轴)位置给定的参数，从当前元素位置移动。
	- rotate()
		- rotate(30deg)方法，在一个给定度数顺时针旋转的元素。负值是允许的，这样是元素逆时针旋转。
	- scale()
		- scale()方法，该元素增加或减少的大小，取决于宽度（X轴）和高度（Y轴）的参数：
		- scale（2,4）转变宽度为原来的大小的2倍，和其原始大小4倍的高度。
	- skew()
		- skew(30deg,20deg)方法，该元素会根据横向（X轴）和垂直（Y轴）线参数给定角度
		- skew(30deg,20deg)是绕X轴和Y轴周围20度30度的元素。
	- matrix()
	div{
		transform: translate(50px,100px);
		-ms-transform: translate(50px,100px); /* IE 9 */
		-webkit-transform: translate(50px,100px); /* Safari and Chrome */
	}
	div{
		transform: scale(2,4); 
		-ms-transform: scale(2,4); /* IE 9 */
		-webkit-transform: scale(2,4); /* Safari and Chrome */
	}
	函数	描述
	matrix(n,n,n,n,n,n)	定义 2D 转换，使用六个值的矩阵。
	translate(x,y)	定义 2D 转换，沿着 X 和 Y 轴移动元素。
	translateX(n)	定义 2D 转换，沿着 X 轴移动元素。
	translateY(n)	定义 2D 转换，沿着 Y 轴移动元素。
	scale(x,y)	定义 2D 缩放转换，改变元素的宽度和高度。
	scaleX(n)	定义 2D 缩放转换，改变元素的宽度。
	scaleY(n)	定义 2D 缩放转换，改变元素的高度。
	rotate(angle)	定义 2D 旋转，在参数中规定角度。
	skew(x-angle,y-angle)	定义 2D 倾斜转换，沿着 X 和 Y 轴。
	skewX(angle)	定义 2D 倾斜转换，沿着 X 轴。
	skewY(angle)	定义 2D 倾斜转换，沿着 Y 轴。	

# CSS3 3D 转换
	- rotateX()  rotateX()方法，围绕其在一个给定度数X轴旋转的元素。
	- rotateY()  rotateY()方法，围绕其在一个给定度数Y轴旋转的元素。
	div{
	transform: rotateX(120deg);
	-webkit-transform: rotateX(120deg); /* Safari and Chrome */
	}
## 3D转换方法
	函数	描述
	matrix3d(n,n,n,n,n,n,
	n,n,n,n,n,n,n,n,n,n)	定义 3D 转换，使用 16 个值的 4x4 矩阵。
	translate3d(x,y,z)	定义 3D 转化。
	translateX(x)	定义 3D 转化，仅使用用于 X 轴的值。
	translateY(y)	定义 3D 转化，仅使用用于 Y 轴的值。
	translateZ(z)	定义 3D 转化，仅使用用于 Z 轴的值。
	scale3d(x,y,z)	定义 3D 缩放转换。
	scaleX(x)	定义 3D 缩放转换，通过给定一个 X 轴的值。
	scaleY(y)	定义 3D 缩放转换，通过给定一个 Y 轴的值。
	scaleZ(z)	定义 3D 缩放转换，通过给定一个 Z 轴的值。
	rotate3d(x,y,z,angle)	定义 3D 旋转。
	rotateX(angle)	定义沿 X 轴的 3D 旋转。
	rotateY(angle)	定义沿 Y 轴的 3D 旋转。
	rotateZ(angle)	定义沿 Z 轴的 3D 旋转。
	perspective(n)	定义 3D 转换元素的透视视图。


	div {
	    width: 100px;
	    height: 100px;
	    background: red;
	    -webkit-transition: width 2s, height 2s, -webkit-transform 2s; /* For Safari 3.1 to 6.0 */
	    transition: width 2s, height 2s, transform 2s;
	}

	div:hover {
	    width: 200px;
	    height: 200px;
	    -webkit-transform: rotate(180deg); /* Chrome, Safari, Opera */
	    transform: rotate(180deg);
	}

# CSS3 动画
## 要创建CSS3动画，你将不得不了解@keyframes规则。
	- @keyframes规则是创建动画。@keyframes规则内指定一个CSS样式和动画将逐步从目前的样式更改为新的样式。
	- Internet Explorer 10、Firefox 以及 Opera 支持 @keyframes 规则和 animation 属性。
	- Chrome 和 Safari 需要前缀 -webkit-。
	- 注意：Internet Explorer 9，以及更早的版本，不支持 @keyframe 规则或 animation 属性。
	- 当在@keyframe创建动画，把它绑定到一个选择器，否则动画不会有任何效果。
	- 指定至少这两个CSS3的动画属性绑定向一个选择器：
		- 规定动画的名称
		- 规定动画的时长


	@keyframes myfirst
	{
	from {background: red;}
	to {background: yellow;}
	}

	@-webkit-keyframes myfirst /* Safari and Chrome */
	{
	from {background: red;}
	to {background: yellow;}
	}
	把 "myfirst" 动画捆绑到 div 元素，时长：5 秒：
	div
	{
	animation: myfirst 5s;
	-webkit-animation: myfirst 5s; /* Safari and Chrome */
	}

	div
	{
	width:100px;
	height:100px;
	background:red;
	position:relative;
	animation:myfirst 5s;
	-webkit-animation:myfirst 5s; /* Safari and Chrome */
	<!-- 或者 -->
	animation:myfirst 5s linear 2s infinite alternate;
	/* Firefox: */
	-moz-animation:myfirst 5s linear 2s infinite alternate;
	/* Safari and Chrome: */
	-webkit-animation:myfirst 5s linear 2s infinite alternate;
	/* Opera: */
	-o-animation:myfirst 5s linear 2s infinite alternate;
		}

	@keyframes myfirst
	{
	0%   {background:red; left:0px; top:0px;}
	25%  {background:yellow; left:200px; top:0px;}
	50%  {background:blue; left:200px; top:200px;}
	75%  {background:green; left:0px; top:200px;}
	100% {background:red; left:0px; top:0px;}
	}

	@-webkit-keyframes myfirst /* Safari and Chrome */
	{
	0%   {background:red; left:0px; top:0px;}
	25%  {background:yellow; left:200px; top:0px;}
	50%  {background:blue; left:200px; top:200px;}
	75%  {background:green; left:0px; top:200px;}
	100% {background:red; left:0px; top:0px;}
	}

### @keyframes所有动画属性
	属性	描述	CSS
	@keyframes	规定动画。	3
	animation	所有动画属性的简写属性，除了 animation-play-state 属性。	3
	animation-name	规定 @keyframes 动画的名称。	3
	animation-duration	规定动画完成一个周期所花费的秒或毫秒。默认是 0。	3
	animation-timing-function	规定动画的速度曲线。默认是 "ease"。	3
	animation-delay	规定动画何时开始。默认是 0。	3
	animation-iteration-count	规定动画被播放的次数。默认是 1。	3
	animation-direction	规定动画是否在下一周期逆向地播放。默认是 "normal"。	3
	animation-play-state	规定动画是否正在运行或暂停。默认是 "running"

# CSS3 多列属性
	属性	描述
	column-count	指定元素应该被分割的列数。
	column-fill	指定如何填充列
	column-gap	指定列与列之间的间隙
	column-rule	所有 column-rule-* 属性的简写
	column-rule-color	指定两列间边框的颜色
	column-rule-style	指定两列间边框的样式
	column-rule-width	指定两列间边框的厚度
	column-span	指定元素要跨越多少列
	column-width	指定列的宽度
	columns	设置 column-width 和 column-count 的简写

# CSS3 用户界面
## 增加了一些新的用户界面特性来调整元素尺寸，框尺寸和外边框。
	- resize
		- 
	- box-sizing
		- content-box 
			- 这是CSS2.1指定的宽度和高度的行为。指定元素的宽度和高度（最小/最大属性）适用于box的宽度和高度。元素的填充和边框布局和绘制指定宽度和高度除外
		- border-box
			- 指定宽度和高度（最小/最大属性）确定元素边框box。也就是说，对元素指定宽度和高度包括padding和border的指定。内容的宽度和高度减去各自双方该边框和填充的宽度从指定的"宽度"和"高度"属性计算
	- outline-offset
	- Firefox、Chrome 以及 Safari 支持 resize 属性。
	- Internet Explorer、Chrome、Safari 以及 Opera 支持 box-sizing 属性。Firefox 需要前缀 -moz-。
	- 所有主流浏览器都支持 outline-offset 属性，除了 Internet Explorer。

	- 边框边缘之外 15 像素处的轮廓：
		div
		{
		border:2px solid black;
		outline:2px solid red;
		outline-offset:15px;
		}		


# 图片
_这部分看css的demo“css3-pic.html”_