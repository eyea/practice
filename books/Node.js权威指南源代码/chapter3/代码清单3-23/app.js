var i=0;
var func1=function(){
    var func2=function(){
        var func3=function(){
            var func4=function(){
                var func5=function(){
                    i=i+1;
                }
                func5();
            }
            func4();
        }
        func3();
    } 
    func2();
}
func1();
console.log(i);                   
    
