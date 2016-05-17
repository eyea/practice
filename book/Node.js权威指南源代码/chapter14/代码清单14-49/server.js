var express = require('express');
var routes = require('./routes');
var app = express();
app.configure(function(){
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});
app.get('/', routes.index);
app.get('/form', routes.form);
app.post('/form', routes.create);
app.listen(1337);