var http = require('http'),
    url = require('url');
var server = http.createServer().listen(1337, 'localhost');
server.on('request', function(req, res) {
    if(req.url!=="/favicon.ico"){
        res.write('<html><head><meta charset="utf-8"/></head>');
        var url_parts = url.parse(req.url);
        switch(url_parts.pathname) {
            case '/':
            case '/index.html':
                res.write('<body>您当前正在访问网站首页。</body></html>');
                break;
            default:
                res.write('<body>您当前正在访问的页面为'+url_parts.pathname+'。</body></html>');
        }
    }
    res.end();
});