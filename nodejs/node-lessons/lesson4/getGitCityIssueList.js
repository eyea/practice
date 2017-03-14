var express = require('express'),
    cheerio = require('cheerio'),
    superagent = require('superagent');

var app = express();

app.get('/',function(req,rep,next){
	superagent.get('https://github.com/shenzhenjs/shenzhenjs.github.io/issues/1')
		.end(function(err, sres){
			if(err){
				return next(err);
			};

			var $ = cheerio.load(sres.text),
				lists = [],
				items = [];
				// items = [],
				// avator = [];
				
				// rep.send($('tr').html());

				$('tbody').each(function(idx, ele){
					// var $ele = $(ele);
					lists.push({
						idx: $('tr').html()
					})
				});

				// $('p').each(function(idx, ele){
				// 	var $ele = $(ele);
				// 	lists.push({
				// 		html: $ele.html()
				// 	})
					
				// });

				var html = $('tr').html();
				items.push(html);

				// rep.send(lists);
				rep.send(items)
				

			// $('#topic_list .user_avatar img').each(function(idx,ele){
			// 	var $ele = $(ele);
			// 	avator.push({
			// 		author: $ele.attr('title')
			// 	})
			// });

			// $('#topic_list .topic_title').each(function(idx,ele){
			// 	var $ele = $(ele);
			// 	items.push({
			// 		title: $ele.attr('title'),
			// 		href:  $ele.attr('href'),
			// 		author: avator[idx]['author']
			// 	})
			// });

			// rep.send(items);

		})
});

app.listen(3000, function(){
	console.log('getCityIssueList server  is listening at port 3000');
})