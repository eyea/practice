var mongoose = require('mongoose'),
Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/node-mongo-examples', function(err){
    if (err) {
        console.log('连接MongoDB数据库失败。');
    }
});
var goodsSchema = new Schema({
    type:String,
    price:Number
});
var storeSchema = new Schema({
    name:String,
    goods:[goodsSchema]
});
var store1={name:'store1',goods:[{type:'food',price:11}]};
var store2={name:'store2',goods:[{type:'food',price:10}]};
var store3={name:'store3',goods:[{type:'food',price:9}]};
var store4={name:'store4',goods:[{type:'food',price:8}]};
var store5={name:'store5',goods:[{type:'book',price:9}]};
var docs=[store1,store2,store3,store4,store5];
var Stores = mongoose.model('stores5',storeSchema);
Stores.create(docs,function(err,docs) {
    if(err) console.log('保存数据失败。');
    else{
        Stores.find(function(err, docs) {
            if(err) console.log('查询数据失败。');
            else{
                console.log(docs);
                mongoose.disconnect();
            }
        });
    }
});
