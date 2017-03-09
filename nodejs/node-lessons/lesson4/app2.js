var superagent = require('superagent'),
	cheerio    = require('cheerio'),
	url        = require('url'),
	express    = require('express'),
	eventproxy = require('eventproxy');


var app = express();

var cnodeUrl   = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
	.end(function(err, res){
		if(err){
			return console.error(err);
		}
		var topicUrls = [];
		var authorUrls= [];
		var $ = cheerio.load(res.text);

		// $('#topic_list .topic_title').each(function(idx, ele){
		// 	var $ele = $(ele),
		// 		href = url.resolve(cnodeUrl, $ele.attr('href'));
		// 	topicUrls.push({
		// 		title: $ele.attr('title'),
		// 		href:  href
		// 	})
		// });
		
		// 文章链接存储
    $('#topic_list .topic_title').each(function (idx, element) {
      var $element = $(element);
      var href = url.resolve(cnodeUrl, $element.attr('href'));
      topicUrls.push(href);
    });	

      // 作者信息存储
    $('#topic_list .user_avatar').each(function(idx, ele){
    	var $ele = $(ele);
    	var author_href = url.resolve(cnodeUrl, $ele.attr('href'));
    	authorUrls.push(author_href);
    });


// console.log(authorUrls);

// console.log(topicUrls);

		var ep = new eventproxy();
		
		// 文章作者详情页
		// ep.after('author_html', authorUrls.length, function(authors){
		ep.after('author_html', authorUrls.length, function(authors){
			authors = authors.map(function(authorPair){
				var authorUrl = authorPair[0],
					authorHtml= authorPair[1],
					$         = cheerio.load(authorHtml);
				return ({
					author_name: $('.userinfo .user_big_avatar .user_avatar').attr('title') ? $('.userinfo .user_big_avatar .user_avatar').attr('title') : 'wxd',
					author_scores: $('.user_profile .unstyled .big').eq(0).text().trim() ? $('.user_profile .unstyled .big').eq(0).text().trim() : 666
				})
			});
			console.log(authorUrls.length);
			console.log('final:');
			console.log(authors);
		});

		authorUrls.forEach(function(author_url){
			superagent.get(author_url)
				.end(function(err, res){
					if(err){
						console.error(err);
					}
					console.log('fetch  '+ author_url + ' successful ~');
					ep.emit('author_html', [author_url, res.text])
				})
		});










        //  文章评论部分代码 
		// ep.after('topic_html', topicUrls.length, function(topics){
		// 	topics = topics.map(function(topicPair){
		// 		var topicUrl = topicPair[0],
		// 			topicHtml= topicPair[1],
		// 			$ 		 = cheerio.load(topicHtml);

		// 		return ({
		// 			title: $('.topic_full_title').text().trim(),
		// 			href : topicUrl,
		// 			comment1: $('.reply_content').eq(0).text().trim()
		// 		});
		// 	});
		// 	console.log('final:');
		// 	console.log(topics);
		// })

		// topicUrls.forEach(function(topicUrl){
		// 	superagent.get(topicUrl)
		// 		.end(function(err, res){
		// 			console.log('fetch ' + topicUrl + ' successful!');
		// 			// console.log(topicUrl)
		// 			ep.emit('topic_html', [topicUrl, res.text]);
		// 		})
		// });



		// console.log(topic)
		// res.send(topic);		
	})

// app.listen(3000, function(){
// 	console.log('start test ...')
// })