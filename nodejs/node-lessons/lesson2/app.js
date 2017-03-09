var express = require('express');
var utility = require('utility');
var app = express();

app.get('/', function (req, res) {
  var q = req.query.q;
  var md5Value = utility.md5(q);
  var sha1Value = utility.sha1(q);

  res.send('md5是-->'+ md5Value+'--sha1是-->' + sha1Value);
  // res.send(sha1Value);
  // res.send('hello world');
});

app.listen(3000, function (req, res) {
  console.log('app is running at port 3000');
});
