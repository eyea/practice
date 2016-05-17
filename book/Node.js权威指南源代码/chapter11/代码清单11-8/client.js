var zlib = require('zlib');
var http = require('http');
var fs = require('fs');
var request = http.get({ host: 'localhost',
                         path: '/',
                         port: 1337,
                         headers: { 'accept-encoding': 'gzip,deflate' } });
request.on('response', function(response) {
    var output = fs.createWriteStream('test2.txt');

    switch (response.headers['content-encoding']) {
        case 'gzip':
            response.pipe(zlib.createGunzip()).pipe(output);
            break;
        case 'deflate':
            response.pipe(zlib.createInflate()).pipe(output);
            break;
        default:
            response.pipe(output);
            break;
    }
});