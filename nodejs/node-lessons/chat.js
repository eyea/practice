var net = require('net');
var clients = [];
net.createServer(function(client) {
    client.write('Enter your name:\n');
    client.once('data', function(data) {
        var username = data.toString().trim();
        clients.push(client);
        broacast(username + ' : Join!\n');
        client.on('data', function(data) {
            var text = username + ' : ' + data;
            broacast(text);
        });
    });
}).listen(11021);

// 单进程的优势。。。
function broacast(text) {
    console.log(text.trim());
    var i = 0, l = clients.length;
    for(; i < l; i++) {
        var c = clients[i];
        c.write(text);
    }
};
