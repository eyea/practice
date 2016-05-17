var util=require('util');
function testFunction(msg1,msg2){
    return msg1+msg2;
}
var parent=new Object();
parent.name="parent";
parent.func=testFunction;
var child1=new Object();
child1.name="child1";
parent.child=child1;
var child2=new Object();
child2.name="child2";
child1.child=child2;
var child3=new Object();
child3.name="child3";
child2.child=child3;
child2.inspect = function() {
    return util.inspect(this,{colors:true,customInspect:false});
};
console.log(util.inspect(parent,{customInspect:true,depth:4}));