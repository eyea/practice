webpackJsonp([0,1],[
/* 0 */
/***/ (function(module, exports) {

// Greeter.js只包括一个用来返回包含问候信息的html元素的函数。
moudle.exports = function(){
  var greet = document.createElement('div');
  greet.innerHTML = 'hi there and greetings';
  return greet;
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// main.js用来把Greeter模块返回的节点插入页面。
var greeter = __webpack_require__(0);
document.getElementById('root').appendChild(greeter());


/***/ })
],[1]);