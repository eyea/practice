var events = require('events');
var eventEmitter = new events.EventEmitter();

//创建事件处理程序
var connectHandler = function connected(){
  console.log('连接成功,待处理...');
  
  // 触发处理
  eventEmitter.emit('data_received');
};

// 绑定connection事件处理程序
eventEmitter.on('connection', connectHandler);

// 创建匿名事件接受函数
eventEmitter.on('data_received', function(){
  console.log('数据接收成功!');
});


// 触发connection
eventEmitter.emit('connection');

console.log('处理完毕')
