var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req, res){
 res.writeHead(200,  {'Content-Type':'text/plain'});
// res.end(util.inspect(url.parse(req.url, true)))

var params = url.parse(req.url, true).query;
res.write('aiya '+ params.q);
res.end();
}).listen(3000);

