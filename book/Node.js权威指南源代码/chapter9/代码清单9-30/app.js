var cp=require('child_process');
var sp1 =cp.exec('node test1.js one two three four',{cwd:'./test'},function(err,stdout,stderr){
    if(err){
        console.log('子进程开启失败: '+err);
        process.exit();
    }
    else{
        console.log('子进程标准输出: '+stdout.toString());
        sp2.stdin.write(stdout.toString());
    }
});
var sp2 =cp.exec('node test2.js',function(err,stdout,stderr){
    process.exit();
});
