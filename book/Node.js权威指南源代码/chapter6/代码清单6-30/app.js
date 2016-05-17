var fs=require('fs');
fs.rmdir('./test',function(err){
    if(err) console.log('删除空目录操作失败。');
    else console.log('删除空目录操作成功。');
});







