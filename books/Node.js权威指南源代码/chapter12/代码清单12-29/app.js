var repl = require("repl");
function testFunc(){
    msg="message";
}
repl.start({useGlobal:true});
//repl.start({useGlobal:false});
testFunc();