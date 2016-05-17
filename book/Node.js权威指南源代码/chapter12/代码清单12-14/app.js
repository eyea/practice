var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('line', function (line) {
    if(line=='exit'||line=='quit'||line=='q')
        rl.close();
    else
        console.log('您输入了: '+line);
});
rl.on('SIGINT', function() {
    rl.question('Are you sure you want to exit?', function(answer) {
        if (answer.match(/^y(es)?$/i)) rl.pause();
    });
});
rl.on('close',function(){
    console.log('行数据读取操作被终止。');
    process.exit();
});







