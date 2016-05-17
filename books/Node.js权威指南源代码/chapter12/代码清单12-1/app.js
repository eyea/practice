var dns = require('dns');
dns.resolve('www.google.com','A',function(e,r) { 
    if (e) console.log(e);
    else console.log(r); 
});
    








