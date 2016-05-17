var testVar="This is a variable from testModule.js.";
var outputTestVar=function outputTestVar(name){
    console.log("This is a call from "+name+".");
}
exports.testVar =testVar;
exports.outputTestVar=outputTestVar;