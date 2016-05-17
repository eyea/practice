var cluster = require('cluster');
cluster.setupMaster({
    exec : "child.js"
});
var worker=cluster.fork();
worker.on('message', function(m) {
    console.log('父进程接收到消息:', m);
    process.exit();
});
worker.send({userName: '陆凌牛'});

