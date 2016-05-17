var repl=require('repl');
var util=require('util');
function writer(obj){
    return util.inspect(obj,{depth:1,colors:false})
}
repl.start({
    //通过各种选项来定制REPL运行环境
    writer:writer
});

