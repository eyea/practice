process.on('message', function(m) {
    console.log('子进程接收到消息:', m);
    process.send({age:40});
});
