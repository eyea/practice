var http = require('http');
var server=http.createServer(function (req, res) {
    if(req.url!=="/favicon.ico"){
        res.writeHead(200, {'Content-Type':'text/plain','Trailer':'Content-MD5'});
        req.on('data',function(data){
            console.log('服务器端接收到数据：'+data);
            res.end();
            //res.write('确认数据：'+data);            
        });
        /*req.on('end',function(){
            res.addTrailers({'Content-MD5':'7895bf4b8828b55ceaf47747b4bca667'});
            res.end();
        });*/
    }
    
}).listen(1337, "127.0.0.1");







