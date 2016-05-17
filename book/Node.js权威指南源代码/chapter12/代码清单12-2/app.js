var dns = require('dns');
dns.resolveMx('google.com',function(err,addresses) {
    if (err) console.log(err);
    console.log(addresses);
});
    








