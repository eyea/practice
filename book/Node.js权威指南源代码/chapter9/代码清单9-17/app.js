var cp=require('child_process');
var sp1 =cp.spawn('node',['test1.js','one','two','three','four'],{cwd:'./test',stdio:['ipc','pipe','ignore']});
var sp2 =cp.spawn('node',['test2.js'],{stdio:['pipe']});
sp1.stdout.on('data',function (data) {
    console.log('子进程标准输出: '+data);
    sp2.stdin.write(data);
});
sp1.on('exit',function(code,signal) {
    console.log('子进程退出，退出代码为：'+code);
    process.exit();
});
sp1.on('error',function (err) {
    console.log('子进程开启失败: '+err);
    process.exit();
});
sp1.on('disconnect', function() {
    console.log('IPC通道被关闭。');
});