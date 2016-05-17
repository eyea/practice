var dns = require('dns');
dns.lookup('google.com',4,function(err,address) { 
    if (err) console.log(err);
    else console.log(address); 
});
    








