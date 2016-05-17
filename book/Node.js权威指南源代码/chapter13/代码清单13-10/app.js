var mongo = require('mongodb');
var host = "localhost";
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db('node-mongo-examples', new mongo.Server(host, port, 
{auto_reconnect:true}), {safe:true});
db.open(function(err,db) {
    db.collection('users', function(err,collection) {
        if(err) throw err;
        else{
            collection.find({},{explain:true}).toArray(function(err, docs) {  
                if(err) throw err;
                else{  
                    console.log(docs[0]);
                    db.close();
                }
            });
        }
    });
});

