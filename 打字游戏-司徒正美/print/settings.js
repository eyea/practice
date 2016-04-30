//by 司徒正美cheng 

TypeNinja.Settings = function(){
    this.element = $('<div class="tn-settings">')
    this.createEvents();
    this.build().connect();
}

TypeNinja.Settings.prototype ={
    constructor:TypeNinja.Settings,
   
    MOST_MISSED_COUNT: 15,

    events: 'layout_change speed_change stop_click start_click reset'.match(/\w+/g),
    //获得当前速度1至9,Number
    getSpeed: function() {
        return this.speeds.val()-0;
    },

    // 加速
    speedUp: function() {
        return this.setSpeed(this.getSpeed() + 1);
    },

    // 减速
    speedDown: function() {
        return this.setSpeed(this.getSpeed() - 1);
    },
    
    // updates the most-missed list
    updateMostMissed: function(most_missed) {
        var chart = [];

        // building the char by putting the most missed up onto the list
        for (var key in most_missed) {
            chart.push({
                symbol: key,
                count: most_missed[key]
            });
        }

        chart = chart.sortBy(function(el){
            return el.count
        }).reverse().slice(0, this.MOST_MISSED_COUNT);
        if(chart.length){
            this.mostMissed.html("");
            chart.forEach(function(item){
                $("<div class='tn-key'>").appendTo(this.mostMissed).html(item.symbol);
            },this);
        }
    },


    //为点击数加一
    countHit: function() {
        this.hits.html(Number(this.hits.html())+1)
        return this.calcAccuracy();
    },
    //为失误数加一
    countMiss: function() {
        this.missed.html(Number(this.missed.html())+1)
        return this.calcAccuracy();
    },
    
    setLayout:function(name){
        //如果此对象存在substr方法证明其是string
        if (name && name.substr) this.layouts.val((name || 'en').toUpperCase());
        $.cookie('tn-layout', this.layouts.val(), {
            expires: 99999
        });
        return this.fire('layout_change', this.layouts.val());
    },

    setSpeed: function(value) {
        if ('123456789'.indexOf(''+value)!==-1);
        this.speeds.val(''+value);
        $.cookie('tn-speed', this.speeds.val(), {
            expires: 99999
        });
        return this.fire('speed_change', this.speeds.val());
    },

    // protected
    calcAccuracy: function() {
        var hits = this.hits.html()-0;
        var missed = this.missed.html()-0;
        var accuracy = hits / (hits+missed) * 100;
        this.accuracy.html(Math.round(accuracy || 0) + '%');
        return this;
    },


    connect:function(){
        var ths = this;
        //设置第一个下拉条
        this.layouts.change(function(){
            ths.setLayout($(this).val());
        });
        //设置第二个下拉条
        this.speeds.change(function(){
            ths.setSpeed($(this).val());
        });
   
        this.trigger.click(function() {
            //点击它时，切换其类甸到tn-stop，如果其类名含有tn-stop则修改为value为结束游戏，最后是失去焦点
            $(this).toggleClass('tn-stop').val($(this).hasClass('tn-stop') ? '结束游戏' : '开始游戏').blur();
            ths.fire($(this).hasClass('tn-stop') ? 'start_click' : 'stop_click');
        });

        this.reset.click(function(e){
            e.preventDefault();
            ths.hits.html("0");
            ths.missed.html("0");
            ths.calcAccuracy().fire("reset");
        });
    },

    build: function() {
        var element = this.element

        //构建右侧栏的内容
        var fieldsets = ["设置外观","数据","失误列表"].map(function(name){
            return $("<fieldset><legend>"+name+"</legend></fieldset>").appendTo(element);
        });
        //第1个fieldset
        var labels = this.tnSettingsOption(["Layout","Speed"],fieldsets[0]) ;
        // 添加下拉条
        this.layouts = this.buildSelect(Object.keys(TypeNinja.Keyboard.LAYOUTS),labels[0])
        this.speeds = this.buildSelect('123456789'.split(''),labels[1]);
        this.trigger = $('<input type="button" value="开始游戏" class="tn-start">')
        labels[1].append(this.trigger);
        //第2个fieldset
        labels = this.tnSettingsOption(["点击数","失误数","准确率"], fieldsets[1]) ;
        //点击数：
        this.hits   = $('<span />').html("0");
        //失误数：
        this.missed   = $('<span />').html("0");
        //精确度
        this.accuracy   = $('<span />').html("0");
        //重设按钮
        this.reset    = $('<a href="" class="tn-reset">重设</a>');
        labels[0].after(this.hits);
        labels[1].after(this.missed);
        labels[2].after(this.accuracy);
        //添加开始游戏按钮
        fieldsets[1].append(this.reset);
        //第3个fieldset
        this.mostMissed = $('<div class="tn-most-missed"/>');
        fieldsets[2].append(this.mostMissed);
        return this;
    },
    

    buildSelect : function(list,el){
        var select =  $("<select />").appendTo(el);
        list.forEach(function(name) {
            $('<option />').val(name).html(name).appendTo(select);
        })
        return select;
    },
    //返回一组包含label元素的jQuery对象
    tnSettingsOption : function(list,el){
        return list.map(function(name){
            return  $('<div class="tn-settings-option"><label>'+name+"</label></div>").
            appendTo(el).find("label");
        });
    }
};
//添加自定义事件系统
include(TypeNinja.Settings,EventDispatcher);

