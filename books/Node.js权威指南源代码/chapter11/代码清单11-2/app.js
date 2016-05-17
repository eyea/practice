var crypto = require('crypto');
var fs = require('fs');
var pem = fs.readFileSync('key.pem');
var key = pem.toString('ascii');
var shasum = crypto.createHmac('sha1',key);
var s = fs.ReadStream('./app.js');
s.on('data', function(d) {
    shasum.update(d);
});
s.on('end', function() {
    var d = shasum.digest('hex');
    console.log(d);
});

    








