// by 司徒正美cheng
//设定进度条
TypeNinja.Progress = function(){
    this.element = $('<div class="tn-progress" />');
    this.build();
}
TypeNinja.Progress.prototype = {
    SEQUENCE: "fjdksla; gtyrueiwoqpbnvmc,x.z/'FJDKSLA:GHTYRUEIWOQPBNVMC<X>Z?\"675849302-1=^&%*$(#)@_!+[{}]`~\\|",
    setLayout: function(layout) {
        // building the current layout
        this.layout = [];
        // filling up the symbols
        layout.join('').split('').forEach(function(symbol, position){
            position = this.sequence.indexOf(this.enLayout[position]);
            if (position > -1) {
                //设置当前键的名字
                this.keys[position][0].innerHTML = this.layout[position] = symbol;
            }
        },this);
        return this;
    },
    
    setLevel: function(number) {    
        this.level = (number && number.substr) ? this.sequence.indexOf(number) : number - 1;
        this.keys.forEach(function(key, i){
            key[i > this.level ? 'addClass' : 'removeClass']('tn-progress-key-disabled');
        },this);
    
        this.scrollTo(this.level);
        $.cookie('tn-level', ''+(((this.level > 1) ? this.level : 1)+1), {
            expires: 99999
        });
        return this;
    },

    levelUp: function() {
        if (this.level < this.layout.length) this.setLevel(this.level + 2);
        return this;
    },

    levelDown: function() {
        if (this.level > 1) this.setLevel(this.level - 1);
        return this;
    },

    //获得进度条中被高亮的字符数组
    getActive: function() {
        //级数越高，数组长度越大
        return this.layout.slice(0, this.level+1);
    },
    // protected
    scrollTo: function(index) {
        var box_size = this.containerBox.width();
       
        var key_size = this.keys[0].width() + 2;
        var max_size = (key_size * this.keys.length) - box_size;

        var offset = box_size/2 - index*key_size;

        if (offset > 0) {
            offset = 0;
        } else if (offset < -max_size) {
            offset = -max_size;
        }
        this.container.css("position","absolute");
        this.container.animate({
            left: '+='+offset
        }, 1000)
    },

    
    build: function() {
        this.enLayout  = TypeNinja.Keyboard.LAYOUTS.EN.join('').split('');
        this.sequence = this.SEQUENCE.split('');
        this.keys = [];
        this.containerBox = $('<div class="tn-progress-container"/>').appendTo(this.element);
        this.container = $('<div/>').appendTo(this.containerBox);
       
        this.sequence.forEach(function(symbol){
            var key = $('<span />').click(this.setLevel.bind(this, symbol));//这里一会儿要检测一下
            this.keys.push(key);
            key.appendTo(this.container);
        },this);
        
    }
}
