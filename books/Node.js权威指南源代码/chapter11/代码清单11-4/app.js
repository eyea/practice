var crypto = require('crypto');
var fs = require('fs');
var pem = fs.readFileSync('key.pem');
var key = pem.toString('ascii');
var sign = crypto.createSign('RSA-SHA256');
sign.update('test');
console.log(sign.sign(key,'hex'));

    








