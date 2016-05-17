var _name,_age;
var name='',age=0;
//模块对象的构造函数
var foo=function(name,age) {
    _name=name;
    _age=age;
}
//获取私有变量_name的变量值
foo.prototype.GetName=function(){
    return  _name;
};
//设置私有变量_name的变量值
foo.prototype.SetName=function(name){
    _name=name;
};
//获取私有变量_age的变量值
foo.prototype.GetAge=function(){
    return  _age;
};
//设置私有变量_age的变量值
foo.prototype.SetAge=function(age){
    _age=age;
};
foo.prototype.name=name;
foo.prototype.age=age;
foo.staticName='';
foo.staticFunction=function(){
    console.log(foo.staticName);
}
module.exports = foo;