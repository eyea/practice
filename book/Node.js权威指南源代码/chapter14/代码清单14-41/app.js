var express = require('express')
var app = express();
console.log('在使用enable方法之前的变量值：');
console.log(app.enabled('trust proxy'));
app.enable('trust proxy');
console.log('在使用enable方法之后的变量值：');
console.log(app.enabled('trust proxy'));
