var mongo = require('mongodb');
var host = "localhost";
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db('node-mongo-examples', new mongo.Server(host, port, 
{auto_reconnect:true}), {safe:true});
db.open(function(err,db) {
    db.collection('goods', function(err,collection) {
        if(err) throw err;
        else{
            collection.createIndex({price:1},function(err,indexName){
                if(err) throw err;
                else{
                    collection.find({type:'food'},{hint:{price:1}}).toArray(function(err, docs) {
                    //collection.find({type:'food'},{hint:{price:1},returnKey:true}).toArray(function(err, docs) { 
                    //collection.find({type:'food'},{max:{price:10}}).toArray(function(err, docs) { 
                    //collection.find({type:'food'},{min:{price:10}}).toArray(function(err, docs) {
                        if(err) throw err;
                        else{  
                            console.log(docs);
                            db.close();
                        }
                    });
                }
            });
        }
    });
});
