// 这里使用 CommonJs的风格
function generateText(){
  var ele = document.createElement('h2');
  ele.innerHTML = 'abc h2 world';
  return ele;
}

module.exports = generateText;
