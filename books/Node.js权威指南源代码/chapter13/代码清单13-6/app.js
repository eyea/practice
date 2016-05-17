var mongo = require('mongodb');
var host = "localhost";
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db('node-mongo-examples', new mongo.Server(host, port, 
{auto_reconnect:true}), {safe:true});
var store1={name:'store1',goods:{type:'food',price:11}};
var store2={name:'store2',goods:{type:'food',price:10}};
var store3={name:'store3',goods:{type:'food',price:9}};
var store4={name:'store4',goods:{type:'food',price:8}};
var store5={name:'store5',goods:{type:'book',price:9}};
var docs=[store1,store2,store3,store4,store5];
db.open(function(err,db) {
    db.collection('stores', function(err,collection) {
        collection.insert(docs,function(err, docs) {
            if(err) throw err;
            else{
                collection.find({goods:{type:'food',price:8}}).toArray(function(err, docs) {
                //collection.find({'goods.type':'food','goods.price':8}).toArray(function(err, docs) {  
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
