process.on('message', function(m,socket) {
    if (m === 'socket') {
        socket.end('客户端请求被子进程处理。');
        process.send('客户端请求被子进程处理。',socket);
    }
});


