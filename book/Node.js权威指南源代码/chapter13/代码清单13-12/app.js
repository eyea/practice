var mongo = require('mongodb');
var host = "localhost";
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db('node-mongo-examples', new mongo.Server(host, port, 
{auto_reconnect:true}), {safe:true});
var docs=[{type:'food',price:11},
          {type:'food',price:10},
          {type:'food',price:9},
          {type:'food',price:8},
          {type:'book',price:9}];
db.open(function(err,db) {
    db.collection('goods', function(err,collection) {
        collection.insert(docs,function(err, docs) {
            if(err) throw err;
            else{         
               collection.findAndModify({type:'food'},[['type',1],['price',-1]],{type:'food',price:100},{new:true},function(err, doc) { 
                    if(err) throw err;
                    else{  
                        console.log(doc);
                        db.close();
                    }
                });
            }
        });
    });
});
