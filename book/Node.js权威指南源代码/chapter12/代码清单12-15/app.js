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
console.log(util.inspect(parent));
//console.log(util.inspect(parent,{showHidden:true}));
//console.log(util.inspect(parent,{showHidden:true,depth:3}));
//console.log(util.inspect(parent,{showHidden:true,depth:3,colors:true}));
/*util.inspect.styles.string='red';
console.log(util.inspect(parent,{showHidden:true,depth:4,colors:true}));*/
