var repl = require("repl");
var vm = require('vm');
var self = this;
var flag=true;
repl.start({
    eval:function(cmd, context, file, callback) {
        var err, result;
        try {
            if (self.useGlobal) {
                if(!flag){
                    console.log("输入命令:"+cmd.replace('\n',''));
                    flag=true;
                }
                result = vm.runInThisContext(cmd, file);
                console.log("运行结果:");
            } else {
                if(!flag){
                    console.log("输入命令:"+cmd.replace('\n',''));
                    flag=true;
                }
                else
                    flag=false;
                result = vm.runInContext(cmd, context, file);
                console.log("运行结果:");
            }
        } 
        catch (e) {
            err = e;
        }
        if (err && process.domain && !isSyntaxError(err)) {
            process.domain.emit('error', err);
            process.domain.exit();
        }
        else {
            callback(err, result);
        }
    }
});

