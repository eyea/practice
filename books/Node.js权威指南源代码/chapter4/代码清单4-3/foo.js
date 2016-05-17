var bar1=require('./bar1.js');
var bar2=require('./bar2.js');
console.log(module.id);
module.id="foo";
console.log(module.id);
console.log(module.filename);
console.log(module.loaded);
console.log(module.parent);
console.log(module.children);