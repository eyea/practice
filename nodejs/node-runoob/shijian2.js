var events = require('events');
var eventEmitter = new events.EventEmitter();

// 触发connection事件
//eventEmitter.emit('connection');

// 绑定connectionHandler到connection
//eventEmitter.on('connection', connectionHandler);

// 定义connectionHandler事件处理函数
var connectionHandler = function connected(){
  console.log('已连接...');
  // 触发接收事件
  eventEmitter.emit('data_recevied');
};

//绑定connectionHandler到connection
eventEmitter.on('connection', connectionHandler);
// 定义事件接收函数
eventEmitter.on('data_recevied',function(){
  console.log('事件已接受了哦')
});

// 触发connection 函数
eventEmitter.emit('connection');
console.log('程序执行完毕!')
