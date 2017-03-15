console.log('__filename is '+ __filename);
console.log('__dirname is '+ __dirname);
function printHello(){
 console.log('hello nodejs');
};

var t = setTimeout(printHello, 2000);

clearTimeout(t);

setInterval(printHello, 2000);

