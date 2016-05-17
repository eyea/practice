var vm = require('vm');
var obj = {x: 2};
var context1 = vm.createContext(obj);
vm.runInNewContext("x=x+2", context1);
console.log(context1.x);
var context2 = vm.createContext(obj);
vm.runInNewContext("x=x+2", context2);
console.log(context2.x);