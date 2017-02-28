// Greeter.js只包括一个用来返回包含问候信息的html元素的函数。
moudle.exports = function(){
  var greet = document.createElement('div');
  greet.innerHTML = 'hi there and greetings';
  return greet;
}
