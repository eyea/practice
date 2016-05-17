var mongo = require('mongodb');
var host = "localhost";
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db('node-mongo-examples', new mongo.Server(host, port, 
{auto_reconnect:true}), {safe:true});
db.open(function(err,db) {
    db.collection('users', function(err,collection) {
        if(err) throw err;
        else{
            collection.remove({username:'aaa'},function(err, result) { 
            //collection.remove({username:'凌牛'},{single:true},function(err, result) { 
                if(err) throw err;
                else{  
                    console.log('成功删除%d条数据文档',result);
                    collection.find({}).toArray(function(err, docs) { 
                        if(err) throw err;
                        else{  
                            console.log('删除后的数据：');
                            console.log(docs);
                            db.close();
                        }
                    });
                }
            });
        }
    });
});
