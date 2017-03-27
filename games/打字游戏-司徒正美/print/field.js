//by 司徒正美cheng
//俄罗斯方块，主游戏界面
TypeNinja.Field = function(){
    this.element = $('<div class="tn-field" >');
    this.createEvents();
    //表示正存在于游戏界面的方块
    this.stack = [];
}
TypeNinja.Field.prototype ={
    events:["hit", "miss"],
    // receives the requests to drop another symbol
    drop: function(symbol, duration, offset_left) {
        var key = $("<div class='tn-key'/>").html(symbol).
        css("left",offset_left+'px').appendTo(this.element);
        var ths = this;

        key.animate({
            top:this.element[0].offsetHeight - key[0].offsetHeight-2
        },
        duration,function(){
            var element = ths.pullElement(symbol.charCodeAt())
            if (element && element[0]) {
                key.effect("highlight",{
                    color:"#F66"
                },1600,function(){
                    element.remove();
                    ths.fire('miss', symbol);
                });
            }
        });
        this.stack.push({
            code: symbol.charCodeAt(),
            element: key
        });
    },
    
    keyPressed: function(which){
        var element = this.pullElement(which);
       
        if(element && element[0]){//由于是jQuery对象，所以要加双重保险
            element.stop();//停止所有在指定元素上正在运行的动画
            element.effect("highlight",{
                color:"#AFA"
            },160,function(){
                element.remove();
            });
            this.fire('hit', element.html());
        }
        
    },

    // removes all currently moving symbols
    clear: function() {
        this.stack.forEach(function(item) {
            item.element.remove();
        });
        this.stack = [];
        return this;
    },

    // protected

    //把当前键丢出正准备下落的候选键外，换言之，减少重复机率
    //放入一个键码，但到键码对应的元素（jQuery对象）
    pullElement: function(which) {
        var unit = null, stack = [];
        // looking for the first matching key
        for (var i=0; i < this.stack.length; i++) {
            if (!unit && this.stack[i].code == which) {
                unit = this.stack[i];
            } else {
                stack.push(this.stack[i]);
            }
        }
        this.stack = stack;   
        return unit ? unit.element : null;
    }
}
//添加自定义事件系统
include(TypeNinja.Field,EventDispatcher);

  