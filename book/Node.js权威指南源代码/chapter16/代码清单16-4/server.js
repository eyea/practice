var express = require('express');
domain=require('domain');
db = require('db');
var order_search = require('order_search');
var order_edit = require('order_edit');
var app = express();
app.configure(function(){
    app.set('view engine', 'ejs');
    app.use(express.cookieParser());
    app.use(express.session({secret:"testApplication",cookie:{maxAge:1200000}}));
    app.use(express.bodyParser());
    app.use('/images',express.static(__dirname+'/images/'));
    app.use(app.router);    
    app.use(function(err,req,res,next) {
        res.send(500,err.message);
    });    
});
app.get('/', order_search.get);
app.post('/search', order_search.search);
app.get('/search', order_search.search);
app.get('/new', order_edit.new);
app.get('/edit/:code',order_edit.search);
app.post('/edit',order_edit.add);
app.post('/edit/:code',order_edit.update);
app.post('/delete/:code',order_edit.delete);
app.get('/return',order_edit.return);
app.listen(80);


