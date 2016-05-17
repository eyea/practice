var domain = require('domain');
var d=domain.create();
d.on('error',function(err){
    console.log('Domain对象捕获到错误。');
});
console.log('原始堆栈：');
console.log(domain._stack);
d.run(function() {
    console.log('运行domain对象后的堆栈内容：');
    console.log(domain._stack);
    throw new Error("error");
});
/*d.run(function() {
    d.exit();
    console.log('运行domain对象后的堆栈内容：');
    console.log(domain._stack);
});
d.run(function() {
    d.exit();
    console.log('运行domain对象后的堆栈内容：');
    console.log(domain._stack);
    throw new Error("error");
});

d.run(function() {
    d.exit();
    console.log('运行exit方法后的堆栈内容：');
    console.log(domain._stack);
    d.enter();
    console.log('运行enter方法后的堆栈内容：');
    console.log(domain._stack);
    throw new Error("error");
});*/




    








