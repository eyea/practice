process.stdout.write("子进程当前工作目录为："+process.cwd());
process.argv.forEach(function(val,index,array) {
    process.stdout.write("\r\n"+index + ': ' + val);
});





