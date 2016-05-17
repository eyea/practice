var domain=require('domain');
var fs=require('fs');
var d = domain.create();
d.name='d1';
d.on('error', function(err) {
    console.error('%s捕获到错误!',d.name,err);
});
d.run(function() {
    process.nextTick(function() {
        setTimeout(function() { //模拟一个回调函数
            fs.open('non-existent file', 'r', function(err, fd) {
                if (err) throw err;
            });
        }, 1000);
    });
});
//d.dispose();




    








