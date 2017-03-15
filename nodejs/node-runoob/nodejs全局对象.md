在浏览器JavaScript中，通常window是全局对爱过你
在nodejs的全局对象是 global；所有的全局变量除了global本身以外都是global对象的属性
在nodejs可以直接访问到global的属性；

global最根本的作用是作为全局变量的宿主

__filename表示当前正在执行的脚本的文件名，输出文件所在位置的绝对路径。如果在模块中，返回的值是模块文件的路径。

__dirname 表示当前执行脚本所在目录

setTimeout(cb, ms);

clearTimeout(t);  t是通过setTimeout()函数创建的定时器

function printHello(){
 console.log('hello nodejs');
};

var t = setTimeout(printHello, 2000);

clearTimeout(t);

setinterval(cb, ms)
clearInterval(t)

nodejs常用工具
http://nodejs.org/api/util.html 


http://www.runoob.com/nodejs/nodejs-global-object.html
