var vm = require('vm');
var script = vm.createScript('globalVar+=1;');
obj = {
    globalVar:0
};
for(var i= 0;i<100;i += 1) {
    script.runInNewContext(obj);
}
console.log(obj.globalVar);
