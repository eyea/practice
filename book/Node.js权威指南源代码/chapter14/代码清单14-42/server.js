var express = require('express')
var app = express();
app.configure(function(){
    app.set('view engine','jade');
});
app.get('/', function(req,res) {
    res.render('index',{pageTitle:'Jade使用示例',layout:false});
    /*res.render('index',{pageTitle:'Jade使用示例',layout:false},function(err,html){
        if(err) console.log(err)
        else res.send(html);      
    });*/
});
app.listen(1337);