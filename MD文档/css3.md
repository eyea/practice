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

