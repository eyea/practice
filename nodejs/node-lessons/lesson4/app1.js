var express = require('express'),
    cheerio = require('cheerio'),
    superagent = require('superagent');

var app = express();

app.get('/',function(req,rep,next){
	superagent.get('https://cnodejs.org/')
		.end(function(err, sres){
			if(err){
				return next(err);
			};

			var $ = cheerio.load(sres.text),
				items = [],
				avator = [];
			$('#topic_list .user_avatar img').each(function(idx,ele){
				var $ele = $(ele);
				avator.push({
					author: $ele.attr('title')
				})
			});

			$('#topic_list .topic_title').each(function(idx,ele){
				var $ele = $(ele);
				items.push({
					title: $ele.attr('title'),
					href:  $ele.attr('href'),
					author: avator[idx]['author']
				})
			});

			rep.send(items)

		})
});

app.listen(3000, function(){
	console.log('app1 is listening at port 3000');
})