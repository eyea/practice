var express = require('express')
var app = express();
app.configure(function(){
    app.set('view engine','jade');
    app.use(express.static(__dirname));
});
app.get('/', function(req,res) {
    res.render('index',{pageTitle:'Jade使用示例',arr:['1','2','3'],layout:true});
    //res.render('index',{pageTitle:'Jade使用示例',arr:['1','2','3']});
});
app.listen(1337);