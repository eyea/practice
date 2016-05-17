var fs=require('fs');
fs.chmod('./message1.txt',0600,function(err){//所有者可读写，其他人没有任何权限
    if(err) console.log("修改文件权限操作失败。");
    else console.log("修改文件权限操作成功。");
});
fs.chmod('./message2.txt',0644,function(err){//所有者可读写，其他人只读
    if(err) console.log("修改文件权限操作失败。");
    else console.log("修改文件权限操作成功。");
});
fs.chmod('./message3.txt',0755,function(err){//所有者有所有权限，其他所有人可读和执行
    if(err) console.log("修改文件权限操作失败。");
    else console.log("修改文件权限操作成功。");
});
fs.chmod('./message4.txt',0740,function(err){//所有者有所有权限，所有者所在的组只读
    if(err) console.log("修改文件权限操作失败。");
    else console.log("修改文件权限操作成功。");
});








