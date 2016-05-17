var foo=require('./foo.js');
var myFoo = new foo("Tom",40);//新建模块对象
console.log("获取修改前的私有变量值");
console.log(myFoo.GetName());//获取模块对象内的_name私有变量值
console.log(myFoo.GetAge());//获取模块对象内的_age私有变量值

console.log("修改私有变量值");
myFoo.SetName("Bob")//设置模块对象内的_name私有变量值
myFoo.SetAge(30)//设置模块对象内的_age私有变量值

console.log("获取修改后的私有变量值");
console.log(myFoo.GetName());//获取模块对象内的_name私有变量值
console.log(myFoo.GetAge());//获取模块对象内的_age私有变量值

console.log("获取修改前的公有变量值");
console.log(myFoo.name);//获取模块对象内的name公有变量值
console.log(myFoo.age);//获取模块对象内的age公有变量值

console.log("修改公有变量值");
myFoo.name="Bob"//设置模块对象内的name公有变量值
myFoo.age=30//设置模块对象内的age公有变量值

console.log("获取修改后的公有变量值");
console.log(myFoo.name);//获取模块对象内的name公有变量值
console.log(myFoo.age);//获取模块对象内的age公有变量值
console.log("获取类变量值");
foo.staticName='Static Name';//设置类变量值
foo.staticFunction();//调用类方法

