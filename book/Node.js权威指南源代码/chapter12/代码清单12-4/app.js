var dns = require('dns');
dns.reverse('202.165.102.205',function(err,domain) { 
    if (err) console.log(err);
    else console.log(domain); 
});
    








