var util=require('util');
function Vehicle(){
}
Vehicle.prototype={
    accerelate:function(){
        console.log("accerelate");
    }
}
function Bike(){
}
util.inherits(Bike,Vehicle);
var bike=new Bike();
bike.accerelate();