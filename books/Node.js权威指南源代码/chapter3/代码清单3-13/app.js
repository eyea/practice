var testModule1=require('./testModule.js');
var testModule2=require('./testModule.js');
delete require.cache[require.resolve('./testModule.js')];
var testModule3=require('./testModule.js');
