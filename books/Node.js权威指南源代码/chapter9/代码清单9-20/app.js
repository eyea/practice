var cp = require('child_process');
var n = cp.fork(__dirname + '/test.js');
n.on('message', function(m) {
    console.log('父进程接收到消息:', m);
    process.exit();
});
n.send({userName: '陆凌牛'});
