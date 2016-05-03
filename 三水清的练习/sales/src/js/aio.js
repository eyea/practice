//= include _tpl.js
//= include _config.js

var CATE = ss ? ss.cates : '{}';


try {
    CATE = JSON.parse(CATE);
} catch (e) {
    CATE = null;
}
if (!CATE || !CATE.malls) {
    $.getJSON(APIURL + '/getCateArray.php?v=' + VERSION, function (json) {
        if (json.errno === 0 && json.data) {
            CATE = json.data;
            ss.cates = JSON.stringify(CATE);
            nav(CATE);
        }
    });
}


function init() {
    //添加导航
    CATE && nav(CATE);
    //返回顶部
    back2Top();
    //主要函数
    main();
}

function nav(data) {
    var $nav = $('#J-nav');
    var malls = data.malls,
        cates = data.cates;

    var t = '<button class="btn mr5 btn-nav" data-type="{{type}}" data-q="{{q}}">{{name}} {{icon}}</button>';
    var html = '<div><span class="fl">商城：</span><div class="tnav"><button class="btn mr5 btn-success" data-type="mall" data-q="all">全部</button>';
    malls.forEach(function (v) {
        var icon = '';
        if (v.icon) {
            icon = TPL('<i class="{{icon}} text-{{cls}}" ' + (v.tooltips ? 'data-toggle="tooltip" data-original-title="{{tooltips}}"' : '') + '></i>', v);
        }
        html += TPL(t, {
            name: v.shortName,
            type: 'mall',
            q: v.name,
            icon: icon
        });
    });
    html += '</div></div>';
    html += '<div><span class="fl">类别：</span><div class="tnav"><button class="btn mr5 btn-success" data-type="cate" data-q="all">全部</button>';
    cates.forEach(function (v) {
        html += TPL('<button class="btn mr5 btn-nav" data-type="{{type}}" data-q="{{q}}">{{name}}</button>', {
            name: v.name,
            q: v.id,
            type: 'cate'
        });
    });
    html += '</div></div>';
    $nav.html(html);
    $('[data-toggle="tooltip"]').tooltip();
}

//主要逻辑
function main() {
    var curMall = 'all',
        curCate = 'all';
    var pager = 1;
    var $nav = $('#J-nav').delegate('button[data-type]', 'click', function () {
        var $t = $(this),
            type = $t.data('type'),
            q = $t.data('q');
        switch (type) {
            case 'mall':
                curMall = q;
                break;
            case 'cate':
                curCate = q;
                break;
        }
        $t.parent().find('.btn-success').removeClass('btn-success');
        $t.addClass('btn-success');

        $content.empty();
        loadData(curMall, curCate, 1);
    });

    var $info = $('#J-info');
    var Template = $('#J-template').html();
    var $loadmore = $('#J-loadmore').click(function () {
        $loadmore.hide();
        $loading.show();
        loadData(curMall, curCate, ++pager);
    });
    var $loading = $('#J-loading');
    var $content = $('#J-content').delegate('button[data-link]', 'click', function () {
        var url = $(this).data('link');
        chrome.tabs.create({
            url: url,
            selected: false
        });
    });


    function getId() {
        return [curMall, curCate].join('-');
    }
    var xhr;

    function loadData(mall, cate, p) {
        p = p || 1;
        mall = mall || 'all';
        cate = cate || 'all';
        var _mall = encodeURIComponent(mall === 'all' ? '' : mall);
        var _cate = encodeURIComponent(cate === 'all' ? '' : cate);

        xhr && xhr.abort();
        $loadmore.hide();
        $loading.show();
        $info.hide();
        $.getJSON(APIURL + '/getcate.php?v=' + VERSION + '&mallname=' + _mall + '&cate=' + _cate + '&page=' + p)
            .done(function (json) {
                if (json.errno === 0) {
                    var html = '';
                    json.data.forEach(function (v) {
                        html += TPL(Template, v);
                    });

                    if (p === 0 || p === 1) {
                        $content.html(html);
                    } else {
                        $content.append(html);
                    }

                    pager = p;
                    if (json.data.length < 30) {
                        $info.html('没有更多特价商品了').show();
                        $loadmore.hide();
                    } else {
                        $info.hide();
                        $loadmore.show();
                    }

                } else if (json.errno === 1) {
                    $loadmore.hide();
                    $info.html('没有更多特价商品了').show();
                } else if (json.errno === 2) {
                    $info.html('在7天内的特价信息中，木有找到更多的特价信息，再等等吧~').show();
                    $loadmore.hide();
                }
                $loading.hide();
            }).fail(function () {
                $loadmore.hide();
                $info.html('网络不畅，请稍后再试！').show();
            });
    }

    loadData(curMall, curCate, 0);
}



//返回顶部
function back2Top() {
    $('#J-top').click(function () {
        $('body').animate({
            scrollTop: 0
        }, 'fast');
    });
    var timer;
    $(window).scroll(function () {
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            var t = $(window).scrollTop();
            if (t > 100) {
                $('#J-top').show();
            } else if (t < 100) {
                $('#J-top').hide();
            }
        }, 300);
    });
}


$(document).ready(init);
