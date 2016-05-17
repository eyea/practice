var crypto = require('crypto');
var fs = require('fs');
var pem = fs.readFileSync('key.pem');
var key = pem.toString('ascii');
var cipher = crypto.createCipher('blowfish', key);
var text = "test";
cipher.update(text,'binary','hex');
var crypted=cipher.final('hex')
console.log(crypted);
/*var decipher = crypto.createDecipher('blowfish',key);
var dec = decipher.update(crypted,'hex','utf8');
dec += decipher.final('utf8');
console.log(dec);*/
    








