var testVar="This is a variable from testModule.js.";
var outputTestVar=function outputTestVar(){
    console.log(testVar);
}
exports.testVar =testVar;
exports.outputTestVar=outputTestVar;