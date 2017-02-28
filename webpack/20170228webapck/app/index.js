require("./main.scss");
var $ = require('jquery');
var sub = require('./sub');
var container = document.createElement('div');
container.innerHTML = '<h1>hello world</h1>';
container.appendChild(sub());

document.body.appendChild(container);
$('body').append('I am from jquery');
