var repl = require("repl");
var con=repl.start("> ").context;
con.msg="示例消息";
con.testFunction=function(){console.log(con.msg);};