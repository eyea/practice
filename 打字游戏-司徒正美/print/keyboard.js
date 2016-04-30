// by 司徒正美cheng
TypeNinja.Keyboard = function(){
    this.element = $('<div class="tn-keyboard"/>');
    this.createEvents();
    this.build().connect();
}
TypeNinja.Keyboard.LAYOUTS = {
    EN: [
    '`~1!2@3#4$5%6^7&8*9(0)-_=+',
    'qQwWeErRtTyYuUiIoOpP[{]}\\|',
    'aAsSdDfFgGhHjJkKlL;:\'"',
    'zZxXcCvVbBnNmM,<.>/?'
    ],

    RU: [
    '][1!2"3№4;5%6:7?8*9(0)-_=+',
    'йЙцЦуУкКеЕнНгГшШщЩзЗхХъЪ\\/',
    'фФыЫвВаАпПрРоОлЛдДжЖэЭ',
    'яЯчЧсСмМиИтТьЬбБюЮ.,'
    ]
};
TypeNinja.Keyboard.FINGERS = [
    '11234444321111',
    '01234444321111',
    '0123444432111',
    '112344443211'
    ]
TypeNinja.Keyboard.prototype = {
    constructor:TypeNinja.Keyboard,
    events:["layout_change", "key_press"],
    setLayout: function(name) {
        var down = null, name = name || 'EN';
        this.layout = this.constructor.LAYOUTS[name.toUpperCase()]
        this.layout.forEach(function(row,i){
            row.split('').forEach(function(symbol, j) {
                if (j % 2) {
                    var key = this.keys[down.charCodeAt()] = this.keys[symbol.charCodeAt()] = this.rows[i][(j-1)/2];
                    key.html('<span>'+down+'</span><span class="up">'+symbol+'</span>');
                } else {
                    down = symbol;
                }
            },this);
        },this);
        //返回一个字符数组
        return this.fire('layout_change', this.layout);
    },
    //这里会切换键盘中的键名
    shiftUp: function(event) {
        if ( event.which == 16)
            this.element.addClass('shifted');
        return this;
    },

    shiftDown: function(event) {
        if (event.which == 16)
            this.element.removeClass('shifted');

        return this;
    },
    //获得当前下落的方块相对于其容器左侧的距离
    getKeyLeftOffset: function(symbol) {
        var key = this.keys[symbol.charCodeAt()], offset = 0;
        if (key) {
            offset = key.position().left - this.element.position().left;
        }
        return offset;
    },
    
    hightlightKey: function(event) {
        var key = this.keys[event.which];
        if(key){
            if (!event.altKey && !event.ctrlKey && !event.metaKey) {
                event.preventDefault();
                key.effect("highlight",1600);
                this.fire('key_press', event.which);
            }
        }
    },
    connect: function(){
        var ths = this
        $(document).keypress(function(e){
            ths.hightlightKey(e)
        });
        $(document).keyup(function(e){
            ths.shiftDown(e)
        });
        $(document).keydown(function(e){
            ths.shiftUp(e)
        });
        return this;
    },
    
    build: function() {
        this.keys = []; // a flat keys list (indexed by key-code)
        this.rows = []; // the row by row keys list
        // grabbing the default layout as the model
        this.constructor.LAYOUTS.EN.forEach(function(row,i){
            var row_el = this.buildRow(i, row);
            //第一行添加backspace键
            if (i == 0) row_el.append(this.buildKey('&larr;', 'backspace', 8));
            //第二行添加tab键
            if (i == 1) row_el.prepend(this.buildKey('&rarr;', 'tab'));
            if (i == 2) {
                //第三行添加capslock键与enter键
                row_el.prepend(this.buildKey('', 'capslock')).
                append(this.buildKey('&crarr;', 'enter', 13));
            }
            if (i == 3) {
                //第四行添加两个Shift键
                row_el.prepend(this.buildKey('Shift', 'l-shift', 16)).
                append(this.buildKey('Shift', 'r-shift', 16));
            }
            this.element.append(row_el);

            this.constructor.FINGERS[i].split('').forEach(function(number,k) {
                row_el.children().eq(k).addClass('tn-keyboard-key-'+number+'-finger')
            });

        },this);
      
        //创建空白键所在的行
        this.element.append( this.buildRow(4, '').append(this.buildKey(' ', 'space', 32)));

        return this;
    },

    buildRow : function(number,key_names){
        var keys = [];
        for(var i=0;i<key_names.length/2;i++){//注意这里不能用forEach，它会过滤所有undefined元素
            keys.push(this.buildKey(''));
        }
        this.rows.push(keys);
        var row_el = $('<div />').addClass('tn-keyboard-row-'+(number+1));
        keys.forEach(function(key){
            row_el.append(key)
        });
        return row_el;
    },

    buildKey : function(label, className, keyCode){
        var key = $('<span class="tn-keyboard-key"/>').addClass(className).html(label)
        if (keyCode && keyCode != 16){
            this.keys[keyCode] = key;    
        }
        return key
    }
}
//添加自定义事件系统
include(TypeNinja.Keyboard,EventDispatcher);


