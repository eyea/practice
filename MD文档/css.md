# `css`背景

* background-color
* background-image   
	- 默认情况下，背景图像进行平铺重复显示，以覆盖整个元素实体.
* background-attachment
* background-position

	background-image:url('gradient2.png');
	background-repeat:repeat-x;
	background-position:right top;
	body {background:#ffffff url('img_tree.png') no-repeat right top;}

# `css`文本

* color
* 文本的对齐方式
  - h1 {text-align:center;}
  - p.date {text-align:right;}
  - p.main {text-align:justify;}  
    - 一行被展开为宽度相等，左，右外边距是对齐（如杂志和报纸）。
* text-decoration 属性用来设置或删除文本的装饰。
   从设计的角度看 text-ecoration属性主要是用来删除链接的下划线：
	- h1 {text-decoration:overline;}
	- h2 {text-decoration:line-through;}
	- h3 {text-decoration:underline;}
* 文本转换
	- p.uppercase {text-transform:uppercase;}
	- p.lowercase {text-transform:lowercase;}
	- p.capitalize {text-transform:capitalize;}	
* 文本缩进
	- p {text-indent:50px;}	
### 其他
* direction 属性
	- ltr  默认。文本方向从左到右。
	- rtl  文本方向从右到左。
	- inherit 规定应该从父元素继承 direction 属性的值。
	- JavaScript 语法：object.style.direction="rtl"
* letter-spacing 属性
	- letter-spacing 属性增加或减少字符间的空白（字符间距）
	- JavaScript 语法：object.style.letterSpacing="3px"
	- normal 默认。规定字符间没有额外的空间。
	- length 定义字符间的固定空间（允许使用负值）。
	- inherit 规定应该从父元素继承 letter-spacing 属性的值。
* text-shadow 属性
	- text-shadow: 2px 2px #ff0000;
	- Internet Explorer 9及更早IE版本不支持text-shadow 属性。
	- JavaScript 语法：object.style.textShadow="2px 2px #ff0000"
	- text-shadow: h-shadow v-shadow blur color;
	- 必需。水平阴影的位置。允许负值。必需。垂直阴影的位置。允许负值。可选。模糊的距离。阴影的颜色
* text-transform 属性
	- text-transform:uppercase capitalize  lowercase;
	-  定义仅有大写字母。 文本中的每个单词以大写字母开头 定义无大写字母，仅有小写字母。
* word-spacing 属性
	- 指定段字之间的空间，应该是30像素 word-spacing:30px;

# `css`文本
* font-family 属性应该设置几个字体名称作为一种"后备"机制，如果浏览器不支持第一种字体，他将尝试下一种字体
	- p{font-family:"Times New Roman", Times, serif;}
* 字体样式
	- font-style:italic; 斜体
* ont-size 属性设置文本的大小。

* 为了避免Internet Explorer 无法调整文本的问题，许多开发者使用 em 单位代替像素。
	- 1em和当前字体大小相等。在浏览器中默认的文字大小是16px。
	- 因此，1em的默认大小是16px。可以通过下面这个公式将像素转换为em：px/16=em

### 使用百分比和EM组合
* 在所有浏览器的解决方案中设置<body>元素的默认字体大小的是百分比
	- body {font-size:100%;}
	- h1 {font-size:2.5em;}
	- h2 {font-size:1.875em;}
	- p {font-size:0.875em;}
	- font-variant	以小型大写字体或者正常字体显示文本。
	- font-weight	指定字体的粗细。

# _CSS_ 链接
* a:link - 正常，未访问过的链接
* a:visited - 用户已访问过的链接
* a:hover - 当用户鼠标放在链接上时
* a:active - 链接被点击的那一刻
* 当设置为若干链路状态的样式，也有一些顺序规则：
	- a:hover 必须跟在 a:link 和 a:visited后面
	- a:active 必须跟在 a:hover后面

# _CSS_ 列表
* CSS列表属性作用如下：
	- 设置不同的列表项标记为有序列表
	- 置不同的列表项标记为无序列表
	- 设置列表项标记为图像
* list-style-type属性指定列表项标记的类型是
	- ul.a {list-style-type: circle;}
	- ul.b {list-style-type: square;}
	- ol.c {list-style-type: upper-roman;}
	- ol.d {list-style-type: lower-alpha;}	
* ul{list-style-image: url('sqpurple.gif');}
### 浏览器兼容性解决方案
ul{list-style-type: none;
padding: 0px;
margin: 0px;
}
ul li{
background-image: url(sqpurple.gif);
background-repeat: no-repeat;
background-position: 0px 5px; 
padding-left: 14px; 
}
* 例子解释：
	- ul:
		- 设置列表样式类型为没有删除列表项标记
		- 设置填充和边距0px（浏览器兼容性）
	- ul中所有li:
		- 设置图像的URL，并设置它只显示一次（无重复）
		- 您需要的定位图像位置（左0px和上下5px）
		- 用padding-left属性把文本置于列表中

# _CSS_ 表格
* border-collapse属性设置表格的边框是否被折叠成一个单一的边框或隔开
	- table{border-collapse:collapse;}

# _CSS_ 边框
* border-style 值:
	- none: 默认无边框
	- dotted: dotted:定义一个点线框
	- dashed: 定义一个虚线框
	- solid: 定义实线边界
	- double: 定义两个边界。 两个边界的宽度和border-width的值相同
	- groove: 定义3D沟槽边界。效果取决于边界的颜色值
	- ridge: 定义3D脊边界。效果取决于边界的颜色值
	- inset:定义一个3D的嵌入边框。效果取决于边界的颜色值
	- outset: 定义一个3D突出边框。 效果取决于边界的颜色值
# 相对定位元素经常被用来作为绝对定位元素的容器块。
## 绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于<html>:

## `clip `属性
	- img{position:absolute;   clip:rect(0px,60px,200px,0px);}

# cursor 属性
* url	
	- 需使用的自定义光标的 URL。
	- 注释：请在此列表的末端始终定义一种普通的光标，以防没有由 URL 定义的可用光标。
* default	默认光标（通常是一个箭头）
* auto	默认。浏览器设置的光标。
* crosshair	光标呈现为十字线。
* pointer	光标呈现为指示链接的指针（一只手）
* move	此光标指示某对象可被移动。
* e-resize	此光标指示矩形框的边缘可被向右（东）移动。
* ne-resize	此光标指示矩形框的边缘可被向上及向右移动（北/东）。
* nw-resize	此光标指示矩形框的边缘可被向上及向左移动（北/西）。
* n-resize	此光标指示矩形框的边缘可被向上（北）移动。
* se-resize	此光标指示矩形框的边缘可被向下及向右移动（南/东）。
* sw-resize	此光标指示矩形框的边缘可被向下及向左移动（南/西）。
* s-resize	此光标指示矩形框的边缘可被向下移动（北/西）。
* w-resize	此光标指示矩形框的边缘可被向左移动（西）。
* text	此光标指示文本。
* wait	此光标指示程序正忙（通常是一只表或沙漏）。
* help	此光标指示可用的帮助（通常是一个问号或一个气球）。

# 浮动
* clear  指定不允许元素周围有浮动元素
	- left
	- right
	- both
	- none
	- inherit
## 使用position属性时始终设置在DOCTYPE声明中！
# _CSS_ 伪类
* :link	a:link	选择所有未访问链接
* :visited	a:visited	选择所有访问过的链接
* :active	a:active	选择正在活动链接
* :hover	a:hover	把鼠标放在链接上的状态
* :focus	input:focus	选择元素输入后具有焦点
* :first-letter	p:first-letter	选择每个<p> 元素的第一个字母
* :first-line	p:first-line	选择每个<p> 元素的第一行
* :first-child	p:first-child	选择器匹配属于任意元素的第一个子元素的 <]p> 元素
* :before	p:before	在每个<p>元素之前插入内容
* :after	p:after	在每个<p>元素之后插入内容
* :lang(language)	p:lang(it)	为<p>元素的lang属性选择一个开始值
### l v h a

# 导航栏
* 作为标准的HTML基础一个导航栏是必须的。在我们的例子中我们将建立一个标准的HTML列表导航栏。导航条基本上是一个链接列表，所以使用 <ul> 和 <li>元素非常有意义：
	<ul>
		<li><a href="default.asp">Home</a></li>
		<li><a href="news.asp">News</a></li>
		<li><a href="contact.asp">Contact</a></li>
		<li><a href="about.asp">About</a></li>
	</ul>
	从列表中删除边距和填充：
	ul{
		list-style-type:none;
		margin:0;
		padding:0;
	  }	
	list-style-type:none - 移除列表前小标志。一个导航栏并不需要列表标记
	移除浏览器的默认设置将边距和填充设置为0
	### 我们只需要 <a>元素的样式，建立一个垂直的导航栏：
	a{
		display:block;
		width:60px;
	}	
	请务必指定a元素在垂直导航栏的的宽度。如果省略宽度，IE6可能产生意想不到的效果。
# 下拉菜单
### 来段代码
	<style>
	/* 下拉按钮样式 */
	.dropbtn {
	    background-color: #4CAF50;
	    color: white;
	    padding: 16px;
	    font-size: 16px;
	    border: none;
	    cursor: pointer;
	}

	/* 容器 <div> - 需要定位下拉内容 */
	.dropdown {
	    position: relative;
	    display: inline-block;
	}

	/* 下拉内容 (默认隐藏) */
	.dropdown-content {
	    display: none;
	    position: absolute;
	    background-color: #f9f9f9;
	    min-width: 160px;
	    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
	}

	/* 下拉菜单的链接 */
	.dropdown-content a {
	    color: black;
	    padding: 12px 16px;
	    text-decoration: none;
	    display: block;
	}

	/* 鼠标移上去后修改下拉菜单链接颜色 */
	.dropdown-content a:hover {background-color: #f1f1f1}

	/* 在鼠标移上去后显示下拉菜单 */
	.dropdown:hover .dropdown-content {
	    display: block;
	}

	/* 当下拉内容显示后修改下拉按钮的背景颜色 */
	.dropdown:hover .dropbtn {
	    background-color: #3e8e41;
	}
	</style>

	<div class="dropdown">
	  <button class="dropbtn">下拉菜单</button>
	  <div class="dropdown-content">
	    <a href="#">菜鸟教程 1</a>
	    <a href="#">菜鸟教程 2</a>
	    <a href="#">菜鸟教程 3</a>
	  </div>
	</div>
	<!-- 如果你想设置右浮动的下拉菜单内容方向是从右到左，而不是从左到右，可以添加以下代码 .dropdown-content{right: 0;} -->

## 图片透明度
	- img{opacity:0.4;filter:alpha(opacity=40); /* For IE8 and earlier */}
	- img:hover{opacity:1.0;filter:alpha(opacity=100); /* For IE8 and earlier */}
# `CSS` 图像拼合技术
* img.home{width:46px;height;40px;background:url(img_navsprites.gif) 0 0;}
* 我们的导航列表中添加一个悬停效果。
	- 可以使用：hover伪类  定位

# 媒体类型
## 一些CSS属性只设计了某些媒体。例如"voice-family"属性是专为听觉用户代理。其他一些属性可用于不同的媒体类型。例如，"font-size"属性可用于屏幕和印刷媒体，但有不同的值。屏幕和纸上的文件不同，通常需要一个更大的字体，sans - serif字体比较适合在屏幕上阅读，而serif字体更容易在纸上阅读
### @media 规则允许在相同样式表为不同媒体设置不同的样式。
* @media screen,print{}
	- all	用于所有的媒体设备。
	- aural	用于语音和音频合成器。
	- braille	用于盲人用点字法触觉回馈设备。
	- embossed	用于分页的盲人用点字法打印机。
	- handheld	用于小的手持的设备。
	- print	用于打印机。
	- projection	用于方案展示，比如幻灯片。
	- screen	用于电脑显示器。
	- tty	用于使用固定密度字母栅格的媒体，比如电传打字机和终端。
	- tv	用于电视机类型的设备。
### input[type="text"]{}
### <hr>横向分割线

