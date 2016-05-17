var fs=require('fs');
var file = fs.createReadStream('./crash.mp3');
var out = fs.createWriteStream('./anotherCrash.mp3');
file.pipe(out,{end:false});
setTimeout(function() {
  file.unpipe(out);
  out.end();
}, 10);






