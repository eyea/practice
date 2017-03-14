var events = require('events');
var eventEmitter = new events.EventEmitter();





//定义事件处理器
var connectionHandler = function connected(){
  console.log('开始链接...');

  // 触发链接成功的返回
  eventEmitter.emit('data_received');
}

// 定义触发链接返回的函数
eventEmitter.on('data_received', function(){
  console.log('链接开始返回...');
 
})

//绑定触发事件到处理器
eventEmitter.on('connection', connectionHandler);

//触发事件
eventEmitter.emit('connection');

console.log('程序执行完毕！')
