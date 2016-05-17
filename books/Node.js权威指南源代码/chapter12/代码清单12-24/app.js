var vm = require('vm');
globalVar = 0;
var script = vm.createScript('globalVar += 1');
for (var i = 0; i < 100 ; i += 1) {
    script.runInThisContext();
}
console.log(globalVar);
