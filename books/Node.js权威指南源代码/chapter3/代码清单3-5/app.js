var testModule=require('./testModule.js');
console.log(testModule.testVar);
if(module === require.main) {
    console.log('This is the main module of application.');
}
