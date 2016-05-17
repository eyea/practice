var domain = require('domain');
var d1=domain.create();
d1.name="d1";
var d2=domain.create();
d2.name="d2";
console.log('原始堆栈：');
console.log(domain._stack);
d1.run(function() {
    console.log('d1对象：');
    console.log(d1);
    console.log('运行d1对象后的堆栈内容：');
    console.log(domain._stack);
});
d2.run(function() {
    console.log('d2对象：');
    console.log(d2);
    console.log('运行d2对象后的堆栈内容：');
    console.log(domain._stack);
});




    








