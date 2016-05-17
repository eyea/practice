var crypto = require('crypto');
var fs = require('fs');
var privatePem = fs.readFileSync('key.pem');
var publicPem = fs.readFileSync('cert.pem');
var key = privatePem.toString();
var pubkey = publicPem.toString();
var data = "test"
var sign = crypto.createSign('RSA-SHA256');
sign.update(data);
var sig = sign.sign(key, 'hex');
var verify = crypto.createVerify('RSA-SHA256');
verify.update(data);
console.log(verify.verify(pubkey, sig, 'hex'));




    








