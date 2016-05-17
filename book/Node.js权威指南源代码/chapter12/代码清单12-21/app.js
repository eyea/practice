var vm = require('vm');
vm.runInThisContext("var obj={name:'Lulingniu'}");
vm.runInThisContext("obj.func=function(){console.log(this.name);};");
vm.runInThisContext("console.log(obj.name);");
vm.runInThisContext("obj.func();");