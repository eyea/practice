var domain = require('domain');
var d1=domain.create();
d1.name="d1";
d1.on('error',function(err){
    console.log('d1对象捕获到错误。');
});
var d2=domain.create();
d2.name="d2";
d2.on('error',function(err){
    console.log('d2对象捕获到错误。');
});
console.log('原始堆栈：');
console.log(domain._stack);
d1.run(function() {
    d2.run(function() {
        console.log('最终堆栈：');
        console.log(domain._stack);
        throw new Error("first");
    });
});
/*d1.run(function() {
    d2.run(function() {
        d1.enter();
        console.log('最终堆栈：');
        console.log(domain._stack);
        throw new Error("first");
    });
});*/
/*d1.run(function() {
    d2.run(function() {
        d1.exit();
        console.log('最终堆栈：');
        console.log(domain._stack);
    });
});*/



    








