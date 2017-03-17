var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(req, res){
  var pathname = url.parse(req.url).pathname;
  console.log('requset for '+ pathname + ' recevied.');
  
  fs.readFile(pathname.substr(1), function(err, data){
    if(err){
      return console.error(err) 
      res.writeHead(404, {'Conten-Type': 'text/html'})
    }else{
      res.writeHead(200, {'Content-Type': 'texy/html'});
      res.write(data.toString())
    }
    res.end()
    
  })
  
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081');
