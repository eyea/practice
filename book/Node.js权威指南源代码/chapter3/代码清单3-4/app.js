var testFunction=function(){
    console.log("callback function executed.");
}
var timer=setInterval(testFunction,3000);
timer.unref();
timer.ref();