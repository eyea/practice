if(typeof Function.prototype.bind !== "function"){
    Function.prototype.bind = function(){
        var args = [].slice.call(arguments),
        scope = args.shift(), func = this;
        return function() {
            //内部函数
            return func.apply(scope, (args.length || arguments.length) ?
                args.concat([].slice.call(arguments)) : args);
        };
    }
}
if(typeof Function.prototype.delay !== "function"){
    Function.prototype.delay = function() {
        var __method = this, args = [].slice.call(arguments), timeout = args.shift() ;
        return window.setTimeout(function() {
            return __method.apply(__method, args);
        }, timeout);
    }
}

if(typeof Array.prototype.random !== "function"){
    Array.prototype.random =  function() {
        for (var j, x, i = this.length; i;
            j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this[0] || null;
    }
}
if(typeof Array.prototype.indexOf !== "function"){
    Array.prototype.indexOf =  function(el,index) {
        var n = this.length >>> 0,
        i = index == null ? 0 : index < 0 ? Math.max(0, n + index) : index;
        for (; i < n; i++)
            if (i in this && this[i] === el) return i;
        return -1;
    }
}
if(typeof Array.prototype.forEach !== "function"){
    Array.prototype.forEach =  function (fn, scope) {
        for(var i=0,n=this.length>>>0;i<n;i++){
            i in this && fn.call(scope,this[i],i,this)
        }
    }
}
if(typeof Array.prototype.map !== "function"){
    Array.prototype.map = function (fn, scope) {
        var result = [],array = this
        this.forEach(function(value, index, array) {
            result.push(fn.call(scope, value, index, array));
        });
        return result;
    }
}
if(typeof Array.prototype.pluck !== "function"){
    Array.prototype.pluck = function(property) {
        var results = [];
        this.forEach(function(value) {
            results.push(value[property]);
        });
        return results;
    }
}
if(typeof Array.prototype.sortBy !== "function"){
    Array.prototype.sortBy =  function(iterator, context) {
        return this.map(function(value, index) {
            return {
                value: value,
                criteria: iterator.call(context, value, index)
            };
        }).sort(function(left, right) {
            var a = left.criteria, b = right.criteria;
            return a < b ? -1 : a > b ? 1 : 0;
        }).pluck('value');
    }
}
if(typeof Object.keys !== "function"){
    Object.keys = function(obj){
        var array = []
        for(var prop in obj)
            if(obj.hasOwnProperty(prop))
                array.push(prop)
        return array
    };
}

var EventDispatcher = {
    $A:function(iterable){
        return Array.prototype.slice.call(iterable)
    },
    createEvents:function(){
        this._listeners = {};
        var names =  this.events || [],name,type;
        names.forEach(function(type){
            name ="on"+ type.replace(/_([a-z])/g, function($1,$2){
                return $2.toUpperCase()
            }).replace(/^\w/, function (s) {
                return s.toUpperCase();
            });
            if(typeof this[name] ==="undefined"){
                this[name] = function(){
                    var args = this.$A(arguments);
                    return this.attachEvent.apply(this,[type].concat(args))
                }
            }
        },this)
    },
    hasEvent:function(type){ 
        return (this._listeners[type] instanceof Array && this._listeners[type].length > 0);
    },
    attachEvent:function(){
        var args = this.$A(arguments),
        type = args.shift(), callback = args.shift();
        if (!this.hasEvent(type))
            this._listeners[type] = [];
        var listeners = this._listeners[type];
        listeners.push({
            callback:callback,
            args: args
        });
        return this;
    },
    fire:function(){
        var args = this.$A(arguments),type = args.shift();
        if (!this.hasEvent(type)) return this;
        var listeners = this._listeners[type];
        listeners.forEach(function(listener){
            listener.callback.apply(this, listener.args.concat(args))
        },this);
        return this;
    }
}

var include = function(Concrete,Interface){//使用ruby式的命名方式，用于添加实例成员
    for(var prop in  Interface) {
        Concrete.prototype[prop] = Interface[prop];
    }
}

TypeNinja = function(element){
    //注意：this.element为一个jQuery对象;
    this.element =  $('<div class="tn-layout" />').appendTo(element);
    this.progress = new TypeNinja.Progress();
    this.field    = new TypeNinja.Field();
    this.keyboard = new TypeNinja.Keyboard();
    this.settings = new TypeNinja.Settings();

    this.element.
    append(this.settings.element).
    append(this.progress.element).
    append(this.field.element).
    append(this.keyboard.element);


    //★★
    this.keyboard
    .onLayoutChange(this.progress.setLayout.bind(this.progress))
    .onKeyPress(this.field.keyPressed.bind(this.field));

    //
    this.settings
    .onLayoutChange(this.keyboard.setLayout.bind(this.keyboard))//★
    .onStartClick(this.start.bind(this))
    .onStopClick(this.stop.bind(this))
    .onReset(this.progress.setLevel.bind(this.progress,2))

    this.field
    .onHit(this.countHit.bind(this))
    .onMiss(this.countMiss.bind(this));
    //初始右栏的一些数值
    //设置所有可设置的键名（主键盘与进度条上的）与下落速度
    this.settings
    .setLayout($.cookie('tn-layout') || 'en')//*此设置将触发★，然后再触发★★*/
    .setSpeed(Number($.cookie('tn-speed') || '2'));
    //设置等级，越高同时下落的方块就越多
   
    this.progress.setLevel(Number($.cookie('tn-level') || '2'));

    // initiating the statisticss
    this.missedKeys = {};
    this.hitsCounter = 0;
    this.missCounter = 0;
}

TypeNinja.prototype = {
    HITS_BEFORE_ADVANCING: 8,
    MISS_BEFORE_SLOW_DOWN: 2,

    MAX_MISSES_BEFORE_LEVEL_UP:   2,
    MIN_MISSES_BEFORE_LEVEL_DOWN: 8,
    
    start: function() {
        this.stopped = false;
        this.dropNext();
    },

    stop: function() {
        this.stopped = true;
        this.field.clear();
    },
    //会取消右下角的失误键列表
    countHit: function(which) {
        if (this.missedKeys[which])
            this.missedKeys[which] --;

        if (this.missedKeys[which] < 1)
            delete(this.missedKeys[which]);

        this.hitsCounter ++;
        this.missCounter = 0;

        if (this.hitsCounter > this.HITS_BEFORE_ADVANCING) {
            this.settings.speedUp();
            this.hitsCounter = 0;
        }

        this.settings.countHit().updateMostMissed(this.missedKeys);
        this.checkProgress();
    },
    //计算当前键码对应的键一共失误了多少次
    countMiss: function(which) {
        if (!this.missedKeys[which]) this.missedKeys[which] = 0;
        this.missedKeys[which] ++;

        this.missCounter ++;
        this.hitsCounter = 0;

        if (this.missCounter > this.MISS_BEFORE_SLOW_DOWN) {
            this.settings.speedDown();
        }

        this.settings.countMiss().updateMostMissed(this.missedKeys);
        this.checkProgress();
    },
    //下落方块
    dropNext: function() {
        if (this.stopped) return false;
        var speed = 1000 + 7000 * (10 - this.settings.getSpeed()) / 10;

        var symbol = this.progress.getActive().concat(this.mostMissedChars()).random() || " ";
        this.field.drop(symbol, speed, this.keyboard.getKeyLeftOffset(symbol));
        this.timer = this.dropNext.bind(this).delay(speed/2);
    },

    mostMissedChars: function() {
        return Object.keys(this.missedKeys);
    },
    // adjusts the progress bar position
    checkProgress: function() {
        var missed_chars = this.mostMissedChars();
    
        if (missed_chars.length < this.MAX_MISSES_BEFORE_LEVEL_UP)
            this.progress.levelUp();
        else if (missed_chars.length > this.MIN_MISSES_BEFORE_LEVEL_DOWN)
            this.progress.levelDown();
    }
}
