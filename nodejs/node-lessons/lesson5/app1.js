var async = require('async');

var account = 0;

var fetchUrl = function(url, callback){
	var delay = parseInt((Math.random() * 10000000) % 2000, 10);
	account++;
	console.log('现在的并发数是', account, ',正在抓取的是', url, ',耗时', delay, '毫秒');
	// setTimeout(function(){
	// 	account --;
	// 	callback(null, url + 'html content')
	// },delay);
};

var urls = [];
for(var i=0;i<26;i++){
	urls.push('http://localhost_' + i);
};

// async.mapLimit(urls, 5, function(url, callback){
// 	fetchUrl(url, callback)
// }, function(err, result){
// 	console.log('final: ');
// 	console.log(result)
// });

async.mapLimit(urls, 5, function(url, callback){
	fetchUrl(url, callback)
});