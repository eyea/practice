var net = require("net"),
repl = require("repl");
net.createServer(function (socket) {
    repl.start({
        prompt: "node via TCP socket> ",
        input: socket,
        output: socket
    }).on('exit', function() {
        console.log('REPL运行环境退出。');
        socket.end();
    });
}).listen(5001);
