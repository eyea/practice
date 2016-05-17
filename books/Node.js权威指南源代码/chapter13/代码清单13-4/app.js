var mongo = require('mongodb');
var host = "localhost";
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db('node-mongo-examples', new mongo.Server(host, port, 
{auto_reconnect:true}), {safe:true});
db.open(function(err,db) {
    db.collection('users', function(err,collection) {
        if(err) throw err;
        else{
            collection.find({}).toArray(function(err, docs) {  
            //collection.find({username:'三'}).toArray(function(err, docs) { 
            //collection.find({username:{ $in:['三','凌牛']}}).toArray(function(err, docs) { 
            //collection.find({username:'三'},{fields:{username:1}}).toArray(function(err, docs) { 
            //collection.find({username:'三'},{fields:{username:1,_id:0}}).toArray(function(err, docs) { 
            //collection.find({username:'三'},{fields:{username:0}}).toArray(function(err, docs) { 
            //collection.find({},{raw:true}).toArray(function(err, docs) { 
            //collection.findOne({},function(err, docs) { 
                if(err) throw err;
                else{  
                    console.log(docs);
                    db.close();
                }
            });
        }
    });
});
