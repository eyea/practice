var vm = require('vm');
var e=0;
vm.runInThisContext("e=e+1");
/*eval("e=e+1");
eval("console.log(e)");*/
