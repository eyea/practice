process.stdin.resume();
process.on('SIGINT', function() {
    console.log('接收到SIGINT信号。');
});

