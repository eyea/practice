fixZIndex
=========

处理IE的z-index BUG
<p>首先看一个例子：</p>
<pre>
&lt;div id="container"&gt;
        &lt;div id="box1"&gt;这个box应该在上面&lt;/div&gt;
&lt;/div&gt;
&lt;div id="box2"&gt;这个box应该在下面，IE浏览器会对定位元素产生一个新的stacking context ，甚至当元素 z-index的为“auto”。&lt;/div&gt;
</pre>

<pre>
#container {
        position: relative;
}
#box1 {
        position: absolute;
        top: 100px;
        left: 210px;
        width: 200px;
        height: 200px;
        background-color: yellow;
        z-index: 20;
}
#box2 {
        position: absolute;
        top: 50px;
        left: 160px;
        width: 200px;
        height: 200px;
        background-color: green;
        z-index: 10;
}
</pre>
<p>在 IE 的 z-index 属性值 10 背景色为绿色的 box 却在了 z-index 属性值 20 的背景色为黄色的 box1 之上</p>

<p>其实这是 IE 浏览器（windows）的一个 BUG ——在 IE 浏览器中，定位元素会产生一个新的 stacking context，并且从 z-index 的值为 0 开始。</p>

<p>现在让我们来理解上面的演示在IE中的显示逻辑。设置了相对定位的 container 产生一个新的 stacking context，所以其被定位的子元素背景色为黄色的 box1 以这个新的 stacking context 为参考来决定层叠顺序。而背景色为绿色的 box2 此时和背景色为黄色的 box1 的父元素 container 为同一个 stacking context，所以他们之间按照 z-index 来决定层叠顺序，即 z-index 属性值 10 背景色为绿色的 box2 在 z-index 属性值 0 的 container 之上。</p>

