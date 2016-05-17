var fs = require('fs');
var readStream = fs.createReadStream('./message.txt');
readStream.pause();
readStream.on('data', function(data) {
    console.log('获取到的数据为：'+data);
})
setTimeout(function() {
    readStream.resume();
}, 1000);






