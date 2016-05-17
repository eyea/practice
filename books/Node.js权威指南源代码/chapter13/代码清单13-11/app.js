var mongo = require('mongodb');
var host = "localhost";
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db('node-mongo-examples', new mongo.Server(host, port, 
{auto_reconnect:true}), {safe:true});
db.open(function(err,db) {
    db.collection('users', function(err,collection) {
        if(err) throw err;
        else{
            collection.update({},{username:'test',firstname:'test'},function(err, result) { 
            //collection.update({},{$set:{username:'test',firstname:'test'}},{multi:true},function(err, result) { 
            //collection.update({username:'aaa'},{username:'aaa',firstname:'aaa'},{upsert:true},function(err, result) { 
                if(err) throw err;
                else{  
                    console.log('成功更新%d条数据文档',result);
                    collection.find({}).toArray(function(err, docs) { 
                        if(err) throw err;
                        else{  
                            console.log('更新后的数据：');
                            console.log(docs);
                            db.close();
                        }
                    });
                }
            });
        }
    });
});
