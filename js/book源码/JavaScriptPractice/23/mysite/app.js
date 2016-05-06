
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var bannedIP = require('./middleware/bannedIP');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use("/test",bannedIP);
app.use(express.cookieParser());//cookieµÄ´¦Àí
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	console.log('env:'+app.get('env'));
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get("/hello/", function(req, res){
  res.write("hello world!");
  res.end('end');
});
app.get("/hello2/", function(req, res){
  res.write("hello world222!");
  res.send('end');
});

app.get("/testjson/", function(req, res){
  res.json({user:"z3f"});
});
app.get("/testjsonp/", function(req, res){
  res.jsonp({user:"z3f"});
});

app.get("/404/", function(req, res){
  res.status(404);
  res.end();
});

app.get("/zip/", function(req, res){
	res.attachment("/index.ejs")
  res.end();
});
app.get("/links/", function(req, res){
	res.links({
	  next: 'http://api.example.com/users?page=2',
	  last: 'http://api.example.com/users?page=5'
	});
	res.end();
});

app.get(/^\/page\/(\w+)(?:-(\w+))?$/, function(req, res){
  var from = req.params[0];
  var to = req.params[1] || from;
  res.cookie("user","z3f",{maxAge:90000});
  console.log(req.cookies);
  res.send('page:' + from + '-' + to);
});
app.get('/:myvar/:myvar2', function(req,res){
	res.send('myvar: ' + req.params.myvar +'<br />myvar2: ' + req.params.myvar2);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
