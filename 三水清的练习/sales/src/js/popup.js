//= include _tpl.js
//= include _config.js
var API = {
    list: APIURL + '/getdata.php?v=' + VERSION + '&page=',
    maxid: APIURL + '/getmaxid.php?v=' + VERSION
};
var emptyFn = function() {};
var FIRST = true;
$(function() {

    var Template = $('#J-template').html();
    var $content = $('#J-content');
    var $loadmore = $('#J-loadmore');
    $('#J-loadBtn').click(function() {
        $loadmore.hide();
        $loading.show();
        $.getJSON(API.list + PAGE).done(append);
    });
    var $loading = $('#J-loading');

    var PAGE = 1;

    $('#J-close').click(function() {
        window.close();
    });
    $('#J-refresh').click(function() {
        refresh();
        return false;
    });


    function refresh() {
        PAGE = 1;
        $content.empty();
        $loadmore.hide();
        $loading.show();
        $.getJSON(API.list + PAGE).done(append);
    }
    $content.delegate('button.buy', 'click', function() {
        chrome.tabs.create({
            url: $(this).data('link'),
            selected: false
        });
    }).delegate('p.J-desc', 'click', function() {
        $(this).find('.J-more').toggle();
    });

    function append(json, source) {

        if (json.errno === 0) {
            var now = +new Date();
            PAGE++;
            var html = '';
            // console.log(json.data);
            json.data.forEach(function(v) {
                var detail = v.detail;
                v.detail = detail.slice(0, 80);
                v.more = detail.slice(80);
                v.mallname = (v.mallname || '').slice(0, 10);
                if (!v.more) {
                    v.more = '';
                }
                html += TPL(Template, v);
            });
            $content.append(html);

            if (FIRST && json.maxid) {
                FIRST = false;
                localStorage.maxCnDealId = json.maxid;
                chrome.browserAction.setBadgeBackgroundColor({
                    color: [255, 68, 68, 255]
                });
                chrome.browserAction.setBadgeText({
                    text: ''
                });
                chrome.browserAction.setTitle({
                    title: '里面条目您都看过了，等有更新了我立马儿通知您！'
                });
                if (json.todayTotal) {
                    var total = localStorage.todayTotal = json.todayTotal;
                    $('#J-total').show().find('.J-text').text(total);
                }
            }
            if (source !== 'from cache') {
                try {
                    json.expire = now + 60 * 60 * 2000; //两分钟过期
                    sessionStorage.newData = JSON.stringify(json);
                } catch (e) {}
            }
        }
        $loading.hide();
        $loadmore.show();
    }
    $('[data-toggle="tooltip"]').tooltip();
    //绑定开关事件
    $('input[data-lsid="openNotice"]').attr('checked', !settings.openNotice);
    $('.J-switch').change(function() {
        var st = settings;
        var $t = $(this);
        var lsid = $t.data('lsid');
        st[lsid] = !this.checked;
        ls.settings = JSON.stringify(st);
        chrome.runtime.sendMessage({
            action: 'updateSwitch',
            id: lsid,
            from: 'popup',
            value: !this.checked
        }, function() {});
    }).each(function(i, v) {
        new Switchery(v, {
            size: 'small',
            color: '#2d89f0'
        });
    });

    try {
        var data = sessionStorage.newData;
        data = JSON.parse(data);
        var now = +new Date();
        if (now < data.expire) {
            append(data, 'from cache');
        }
    } catch (e) {
        setTimeout(function() {
            $.getJSON(API.list + PAGE).done(append);
        }, 50);
    }
});



//= include _tpl.js


chrome.runtime.sendMessage({
    action: 'startFeedTimer'
}, emptyFn);
