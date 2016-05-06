<%@language="javascript"%>
<%//<%是asp服务器端运行代码的起始符号
//@language="javascript"表示本页面运行的服务器端默认语言设置为JavaScript
var names = ["z3f","admin","test","anna","cindy","diana"];//定义一个数组模拟数据表示已经注册过的用户
//获取网址传递过来的参数username，在JavaScript语法中时时区分大小写的
var q = Request.QueryString("username");//通过ASP内置对象获取数据
var has = 0						//定义一个变量用来存储是否有输入的用户名
for (var i=0;i<names.length;i++){	//循环比对，一般项目中是查询数据库操作
	if(names[i]==q ){			//如果用户名已存在就标记
		has = 1;					//保存起来
		break;						//退出循环
	}
}
if(has == 1){
	Response.Write(q+"已注册，请换其他用户名！");//如果找到同名用户则不能注册，并通过ASP内置对象输出
}else{
	Response.Write(q+"还没有注册，恭喜你！");//如果没有同名用户则可以注册，并通过ASP内置对象输出
}
%>