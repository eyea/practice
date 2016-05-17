var cluster = require('cluster');
cluster.setupMaster({
    exec : "child.js"
});
cluster.fork();
console.log('这段代码被运行在主进程中。');
console.log('cluster.settings属性值：%j',cluster.settings);
