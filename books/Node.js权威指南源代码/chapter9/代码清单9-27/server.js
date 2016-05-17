var child = require('child_process').fork('child.js');
var server = require('net').createServer();
server.on('connection', function(socket) {
    if (socket.remoteAddress !== '192.168.1.100') {
        child.send('socket', socket);
        return;
    }
    socket.end('客户端请求被父进程处理。');
});
server.listen(42367,'192.168.1.100');
