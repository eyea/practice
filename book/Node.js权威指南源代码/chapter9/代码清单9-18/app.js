var cp=require('child_process');
var fs=require('fs');
var out = fs.openSync('./message.txt','w');
var sp =cp.spawn('node',['write.js'],{
   detached: true,
   stdio: ['ignore', out,'ignore' ]
});
sp.unref();