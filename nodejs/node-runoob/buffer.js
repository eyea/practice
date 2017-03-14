var buf1 = new Buffer(10),
    buf2 = new Buffer([1,2,3,4,5]),
    buf3 = new Buffer('www.eyeseau.com', 'utf-8');
// 写入缓冲区
var len = buf3.write('www.eeseau.com');

var str = buf3.toString();
var json= buf3.toJSON();





//console.log(len);


//http://www.runoob.com/nodejs/nodejs-buffer.html
