var mongo = require('mongodb');
var host = "localhost";
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db('node-mongo-examples', new mongo.Server(host, port,{auto_reconnect:true}), {safe:true});
var aricle1={name:'TV',tags:['device','electric equipment']};
var aricle2={name:'apple',tags:['fruit','food','citrus']};
var article3={name:'Node.js',tags:['language','web','computer']};
var docs=[aricle1,aricle2,article3];
db.open(function(err,db) {
    db.collection('articles5', function(err,collection) {
        collection.insert(docs,function(err, docs) {
            if(err) throw err;
            else{
                collection.find({tags:['fruit','food','citrus']}).toArray(function(err, docs) { 
                //collection.find({tags:'citrus'}).toArray(function(err, docs) {  
                //collection.find({'tags.0':'fruit'}).toArray(function(err, docs) {   
                    if(err) throw err;
                    else{  
                        console.log(docs);
                        db.close();
                    }
                });
            }
        });
    });
});
