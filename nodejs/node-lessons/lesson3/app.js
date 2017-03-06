var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
// cheerio(https://github.com/cheeriojs/cheerio ) 大家可以理解成一个 Node.js 版的 jquery，用来从网页中以 css selector 取数据，使用方式跟 jquery 一样一样的。

var app = express();

app.get('/', function (req, res, next) {
  // superagent(http://visionmedia.github.io/superagent/ ) 是个 http 方面的库，可以发起 get 或 post 请求。
  // 用 superagent 去抓取 https://cnodejs.org/ 的内容
  superagent.get('https://cnodejs.org/')
    .end(function (err, sres) {
      // // 常规的错误处理
      if (err) {
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了      
      var $ = cheerio.load(sres.text);
      var content = sres.text;
      var items = [];
      var test = [];

      $('.user_avatar img').each(function(idx,ele){
        var $ele = $(ele);
        test.push({
          author: $ele.attr('title')
        })
      });

      $('#topic_list .topic_title').each(function (idx, element) {
        var $element = $(element);
        

        items.push({
          title: $element.attr('title'),
          href: $element.attr('href'),
          author: test[idx]['author']
        });
      }); 
      console.log(items.length);


      res.send(items);
      // res.send(test);
      // res.send(content);   // 直接出页面  
    });
});


app.listen(3000, function () {
  console.log('app is listening at port 3000');
});
