process.on('uncaughtException', function(err) {
    console.log('捕捉到一个未被处理的错误:'+err);
});
nonexistentFunc();

