var vm = require('vm');
var obj = { name:"" };
vm.runInNewContext("name='Lulingniu'",obj);
vm.runInNewContext("age=40",obj);
console.log(obj.name);
console.log(obj.age);