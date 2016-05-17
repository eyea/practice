var http=require('http');
var url=require('url');
var server = http.createServer(function(sreq, sres) {
    var url_parts = url.parse(sreq.url);
    var opts = {
        host: 'www.amazon.cn',
        port: 80,
        path: url_parts.pathname,
        headers: sreq.headers
    };
    var creq = http.get(opts, function(cres) {
        sres.writeHead(cres.statusCode, cres.headers);      
        cres.pipe(sres); 
    });
    sreq.pipe(creq);
});
server.listen(1337, '127.0.0.1');
