var async = require('async');

var count =0;

var fetchUrl = function(url, callback){
	var delay = parseInt((Math.random()*100000)%200,10);
	count ++;
	console.log('现在的并发数', count, '正在抓取的是' ,url, '耗时', delay);
	setTimeout(function(){
		count--;
		callback(null, url, 'html content');
	},delay);
};

var urls = [];
for(var i=0;i<27;i++){
	urls.push('localhost://eyea__'+i);
};

async.mapLimit(urls, 5, function(url, callback){
	fetchUrl(url, callback);
},function(err, result){
	console.log('final:');
	console.log(result);
})