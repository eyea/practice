//= include _tpl.js
//= include _config.js
var Labels = ['label-success', 'label-info', 'label-important', 'label-warning', '', 'label-inverse'];

var ID = (+new Date());
$(function() {
    var $switchery = {};
    $('[data-toggle="tooltip"]').tooltip();

    $('#J-sound-test').click(function() {
        var $node = $(this);
        $node.button('loading');
        var b = new Audio('sound/notify.mp3');
        b.addEventListener('play', function() {
            $node.button('loading');
        });
        b.addEventListener('ended', function() {
            $node.button('reset');
        });
        b.play();
    });

    $("#J-desktop-test").click(function() {
        chrome.notifications.create('test-desktop' + (ID++), {
            type: 'basic',
            title: 'Razer 雷蛇 Kraken 北海巨妖 游戏耳机  159元包邮',
            message: '雷蛇Kraken北海巨妖是一款兼顾电竞和音乐的游戏耳机...',
            iconUrl: '../img/test.jpg',
            buttons: [{
                title: '立即去抢购>>',
                iconUrl: '../img/icon64.png'
            }]
        }, function() {});
    });

    //绑定定时静默时间选择器事件
    $('.J-timer-select').change(function() {
        var $t = $(this);
        var val = this.value;
        var quietTimer = ls.quietTimer ? ls.quietTimer : '';
        quietTimer = quietTimer.split('-');
        quietTimer[$t.data('index') | 0] = val;
        quietTimer = quietTimer.map(function(v) {
            return v ? v : 0;
        });
        ls.quietTimer = quietTimer.join('-');
        chrome.runtime.sendMessage({
            action: 'updateQuietTimer'
        }, emptyFn);
    });
    //设置开关
    for (var i in settings) {
        // console.log(i, settings[i]);
        $('input[data-lsid="' + i + '"]').attr('checked', !!settings[i]);
        if (i === 'beQuiet') {
            if (!!settings[i]) {
                $('.J-timer-select').removeAttr('disabled');
                var quietTimer = ls.quietTimer ? ls.quietTimer : '';
                quietTimer = quietTimer.split('-');
                if (quietTimer.length !== 2) {
                    $('.J-timer-select').val(0);
                    ls.removeItem('quietTimer');
                } else if ((quietTimer[0] | 0) >= (quietTimer[1] | 0)) {
                    $('.J-timer-select').val(0);
                    ls.removeItem('quietTimer');
                } else {
                    $('#J-quiet-time1').val(quietTimer[0]).trigger('change');
                    $('#J-quiet-time2').val(quietTimer[1]).trigger('change');
                }
            } else {
                $('.J-timer-select').attr('disabled', 'disabled');
            }
        }
    }
    //绑定开关事件
    $('.J-switch').change(function() {
        var st = settings;
        var $t = $(this);
        var lsid = $t.data('lsid');
        st[lsid] = !!this.checked;
        if (lsid === 'beQuiet') {
            if (this.checked) {
                $('.J-timer-select').removeAttr('disabled');
            } else {
                $('.J-timer-select').attr('disabled', 'disabled');
            }
        } else if (lsid === 'openNotice') {
            if (this.checked) {
                $switchery.hitaoNotice.enable();
            } else {
                $switchery.hitaoNotice.disable();
            }
        }
        ls.settings = JSON.stringify(st);
        chrome.runtime.sendMessage({
            action: 'updateSwitch',
            id: lsid,
            value: this.checked
        }, emptyFn);
    }).each(function(i, v) {
        var $t = $(this);
        var lsid = $t.data('lsid');
        $switchery[lsid] = new Switchery(v);
    });

    if (!settings.openNotice) {
        $switchery.hitaoNotice.disable();
    }

    $('#J-max-notify').val(localStorage.MAX_NOTIFY ? localStorage.MAX_NOTIFY : 3).change(function() {
        localStorage.MAX_NOTIFY = $(this).val();
    });
    $('#J-notify-interval').val(localStorage.NOTIFY_INTERVAL ? localStorage.NOTIFY_INTERVAL : 5).change(function() {
        localStorage.NOTIFY_INTERVAL = $(this).val();
        chrome.runtime.sendMessage({
            action: 'notifyInterval'
        }, emptyFn);
    });
    //关键字事件--------------------------
    $('#J-keyword-submit').click(function() {
        keypress();
        return false;
    });
    $('#J-keyword').keypress(function(e) {
        if (e.keyCode === 13) {
            keypress();
        }
    });
    if (keywords.length) {
        var html = '';

        keywords.forEach(function(v) {
            html += '<span class="label ' + getRandomLabelClass() + '"><a class="J-dkw" href="query.html?q=' + encodeURIComponent(v) + '" target="_blank">' + v + '</a><span class="J-close icon-close"></span></span>';
        });
        $('#J-kw-con').html(html);
    }



    $('#J-hot-keyword').delegate('span.J-label', 'click', function() {
        var $t = $(this);
        var kw = $t.html();
        insertKeyword(kw);
    });
    $('#J-kw-con').delegate('.J-close', 'click', function(e) {
        e.stopPropagation();
        var $t = $(this).parent();
        var kw = $.trim($t.text());
        if (keywords.indexOf(kw) !== -1) {
            keywords.splice(keywords.indexOf(kw), 1);
            ls.keywords = JSON.stringify(keywords);
            chrome.runtime.sendMessage({
                action: 'updateKeyword'
            }, emptyFn);
        }
        $t.remove();
        if ($('#J-kw-con').children().length === 0) {
            $('#J-kw-con').html('<p>竟然还是空的，添加订阅关键字会帮你监控你想要的优惠信息哦</p>');
        }
    })

    function keypress() {
        var kw = $.trim($('#J-keyword').val());
        if (kw === '') {
            return false;
        } else {
            insertKeyword(kw);
            $('#J-keyword').val('');
        }
        return false;
    }

    //关键字事件<<<<<<<<<<<<<<-------------


    getHot();


});



function insertKeyword(kw) {
    if (keywords.indexOf(kw) !== -1) {
        // console.log(keywords, keywords.indexOf(kw));
        return;
    }
    // console.log(keywords);
    keywords.push(kw);
    ls.keywords = JSON.stringify(keywords);
    chrome.runtime.sendMessage({
        action: 'updateKeyword'
    }, emptyFn);
    if ($('#J-kw-con span').length) {

        $('<span class="label ' + getRandomLabelClass() + '">' + kw + '<span class="J-close icon-close"></span></span>').hide().insertBefore($('#J-kw-con span').eq(0)).show('fast');
    } else {
        $('#J-kw-con').empty().html('<span class="label ' + getRandomLabelClass() + '">' + kw + '<span class="J-close icon-close"></span></span>');
    }
}

function getRandomLabelClass() {
    return Labels[Math.floor(Math.random() * Labels.length)];
}



function getHot() {
    var kws = sessionStorage.hotKeywords;
    try {
        kws = JSON.parse(kws);
    } catch (e) {}
    // console.log(kws);
    if (!kws) {
        $.getJSON(APIURL + '/gethot.php?v=' + VERSION).done(function(json) {
            cb(json);
            try {
                sessionStorage.hotKeywords = JSON.stringify(json);
            } catch (e) {}
        });
    } else if (Array.isArray(kws) && kws.length) {
        cb(kws);
    }

    function cb(json) {
        var html = '';
        json.forEach(function(v) {
            html += '<span title="点击添加到订阅" class="J-label label ' + getRandomLabelClass() + '">' + v + '</span>';
        });
        $('#J-hot').after(html);
    }
}
