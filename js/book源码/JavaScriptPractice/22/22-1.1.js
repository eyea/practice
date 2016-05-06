var http = require('http');
	http.createServer(function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	  res.end('Hello World\n');
	}).listen(1337, '127.0.0.1');
//var filename = require('filename.js');
//filename.hello("test");
for(var n in require){

console.log("require["+n+"]="+require[n])
}
console.log('Server running at http://127.0.0.1:1337/');