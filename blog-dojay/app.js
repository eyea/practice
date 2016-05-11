var express      = require('express'),
	path         = require('path'),
	favicon      = require('serve-favicon'),
	cookieParser = require('cookie-parser'),
	bodyParser   = require('body-parser'),
	session      = require('express-session'),
	MongoStore   = require('connect-mongo')(session);

var routes = require('./routes/routes');

// 实例化一个express
var app = express();

// 设置端口
app.set('port', process.env.PORT || 3000);

// 设置视图引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(favicon(__dirname + './src/imgs/favicon.ico'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// 设置静态文件
// app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'build')));

routes(app);

app.listen(app.get('port'), function() {
	console.log('端口' + app.get('port'));
})

