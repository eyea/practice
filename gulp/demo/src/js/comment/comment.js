/**
 * @ignore  ====================================================================
 * @fileoverview 新闻详情评论
 * @author  dongjie@xfz.cn
 * @version 1.0.0
 * @ignore  created in 2015-11-27
 * @ignore  depend jquery
 * @ignore  ====================================================================
 */

// 模板
var commentTpl = require('../tpl/comment/comment.html'),
    commentListTpl = require('../tpl/comment/commList.html'),
    commentSingleTpl = require('../tpl/comment/commSingle.html');

var mobileLogin = require('../login/mobileLogin.js');
var pcLogin = require('../login/pcLogin.js');

var comment = {

    init : function() {
        var _this = this;
        var writeCommRender = template.compile(commentTpl),
            writeCommHtml = writeCommRender({
                isPage : _this.isPage()
            });
        $('.detail-content').after(writeCommHtml);
        this.getComment();
    },
    // 获取评论
    getComment : function() {
        var _this = this;

        // 获取url中的uid
        var uid = (window.location.pathname).match(/[0-9]\d*/);

        $.ajax({
            url: '/api/website/'+_this.isPage()+'/'+uid+'/comments/',
            type: 'GET',
            dataType: 'json',
            data: {
                p: 1,
                n: 50
            },
            success: function(res) {
                if(res.code == "200") {
                    if(res.count <= 0) {
                        $('.open-comm').fadeOut(0, function() {
                            $('.close-comm').fadeIn(0);
                        });
                    }else{
                        $('.close-comm').fadeOut(0, function() {
                            $('.open-comm').fadeIn(0);
                        });
                    }
                    var commListData = res.data,
                        today = Date.parse(new Date());

                    for(var i=0,len=commListData.length,formatDate;i<len;i++) {
                        // 时间处理
                        commListData[i].create_time = _this.dealTime(commListData[i].create_time);

                        if(commListData[i].reply.create_time) {
                            commListData[i].reply.create_time = commListData[i].reply.create_time ? _this.dealTime(commListData[i].reply.create_time) : "";
                            commListData[i].reply.member.realname =commListData[i].reply.member.realname ? _this.dealWordsLen(commListData[i].reply.member.realname, 4) : "";
                            commListData[i].reply.member.company =commListData[i].reply.member.company ?  _this.dealWordsLen(commListData[i].reply.member.company, 8) : "";
                            commListData[i].reply.member.work =commListData[i].reply.member.work ? _this.dealWordsLen(commListData[i].reply.member.work, 6) : "";
                        }
                        // 字数处理
                        commListData[i].member.realname = commListData[i].member.realname ? _this.dealWordsLen(commListData[i].member.realname, 4) : "";
                        commListData[i].member.company = commListData[i].member.company ? _this.dealWordsLen(commListData[i].member.company, 8) : "";
                        commListData[i].member.work = commListData[i].member.work ? _this.dealWordsLen(commListData[i].member.work, 6) : "";
                    }

                    var render = template.compile(commentListTpl),
                        html = render({
                            commData : res.data
                        });

                    $('.write-comm').after(html);
                    $('.write-comm h2 span').html('('+res.count+')');
                    _this.bind();
                    _this.writeComm();
                }
            }
        });
    },
    // 字数处理
    dealWordsLen : function(str, len) {
        return str.substring(0, len);
    },
    // 时间处理
    dealTime : function (time) {
        var timeNow = Date.parse(new Date()),
            nowYear = (new Date()).getFullYear();

        var time    = time,
            cur     = Date.parse(new Date(time.replace(/-/g,"/"))),
            year    = (time.split(' ')[0]).replace(/-/g,"/").split('/')[0],
            month   = (time.split(' ')[0]).replace(/-/g,"/").split('/')[1],
            day     = (time.split(' ')[0]).replace(/-/g,"/").split('/')[2],
            hour    = time.split(' ')[1].split(':')[0],
            minutes = time.split(' ')[1].split(':')[1];

        var timeDiff = ((timeNow - cur)/1000);

        if( timeDiff < 60 ) {
            time = '刚刚';
        }else if(60 <= timeDiff && timeDiff < 3600) {
            time = Math.round(timeDiff/60) + '分钟前';
        }else if(3600 <= timeDiff && timeDiff < 43200) {
            time = Math.round(timeDiff/3600) + '小时前';
        }else if(43200 <= timeDiff) {
            if(year < nowYear) {
                time = year+'年'+month+'月'+day+'日 '+hour+':'+minutes;
            }else{
                time = month+'月'+day+'日 '+hour+':'+minutes;
            }
        }
        
        return time;
    },
    // 回复时间
    resTime : function () {
        var timeNow = new Date(),
            month = timeNow.getMonth();
            day = timeNow.getDate();
            hour = timeNow.getHours();
            minutes = timeNow.getMinutes();

        return month+'月'+day+'日 '+hour+':'+minutes;
    },
    // 判断当前页面是哪个页面
    isPage: function() {
        var page = location.pathname;
        if(page.indexOf('post') > 0) {
            return 'article';
        }else if(page.indexOf('course') > 0) {
            return 'course';
        }else if(page.indexOf('active') > 0 || page.indexOf('event') > 0) {
            return 'active';
        }
    },
    hideTips : function() {
        $('.page-comment .tips').fadeOut(300);
    },
    // 填写评论
    writeComm: function() {
        var _this = this;

        if($('body').attr('device') == 'pc') {
            $('.touch-no-login').hide();
           
            if(window.loginState == 0) {
                 $('textarea').attr('placeholder','请登录后参与评论~');
            }else{
                 $('textarea').attr('placeholder','请填写评论~');
            }
            $('.page-comment #btn').off().on('click', function() {
                if(window.loginState == 0) {
                    pcLogin.showLogin();
                }else{
                    _this.addComm();
                }
            })
        }else{
            if(window.loginState == 1) {
                $('.touch-no-login').hide();
                $('.page-comment #btn').off().on('click', function() {
                    _this.addComm();
                })
            }else{
                $('.touch-no-login').show();
                $('.open-comm').hide();
                $('.close-comm').hide();
                _this.loginShow();
            }
        }
    },
    // 显示登陆dialog
    loginShow: function() {
        $('.touch-no-login').on('click', function() {
            if(window.loginState != 1) {
                mobileLogin.showLogin();
            }
        });
    },
    addComm : function() {
        var _this = this;
        var uid = (window.location.pathname).match(/[0-9]\d*/);
        var token = $('.login-container input').val();
        if($.trim($('#comm-input').val()).length <= 0) {
            $('.page-comment .tips').fadeIn(300, function() {
                $(this).html(('内容不能为空'));
                setTimeout(function() {
                    _this.hideTips();
                },1000);
            });
            return false;
        }else{
            $.ajax({
                url: '/api/website/'+_this.isPage()+'/'+uid+'/comment/add/ ',
                type: 'POST',
                dataType: 'json',
                data: {
                    csrfmiddlewaretoken: token,
                    content: $.trim($('#comm-input').val())
                },
                success: function(res) {
                    if(res.code == "200") {
                        var render = template.compile(commentSingleTpl),
                            html = render({
                                photo: $('.open-comm .photo-name img').attr('src'),
                                name: $('.open-comm .photo-name .name').html(),
                                time: '刚刚',
                                content: $.trim($('#comm-input').val())
                            });
                        if($('.comm-list').length>0) {
                            $('.comm-list ul li').eq(0).before(html);
                        }else{
                            var photo = $('.open-comm .photo-name img').attr('src'),
                                name = $('.open-comm .photo-name .name').html(),
                                time = '刚刚',
                                content = $.trim($('#comm-input').val());
                            var tpl = '<div class="comm-list">'+
                                        '<ul>'+
                                            '<li>'+
                                                '<div class="photo-name-time">'+
                                                    '<div class="photo-name">'+
                                                        '<span class="photo">'+
                                                            '<img src="'+photo+'">'+
                                                        '</span>'+
                                                        '<div class="name-position">'+
                                                            '<span class="name">'+name+'</span>'+
                                                            '<span class="position"></span>'+
                                                        '</div>'+
                                                    '</div>'+
                                                    '<div class="time">'+time+'</div>'+
                                                '</div>'+
                                                '<div class="comm-content">'+content+'</div>'+
                                            '</li>'+
                                        '</ul>'+
                                    '</div>';
                            $('.write-comm').after(tpl);
                        }
                        $('#comm-input').val('');
                    }
                }
            });
        }
    },
    bind: function() {
        var _this = this;
        var $commentBtn = $('textarea');
        // 评论
        $commentBtn.off().on('click', function() {
            if($('body').attr('device') == 'pc') {
                if(window.loginState != 1) {
                    pcLogin.showLogin();
                }
            }else{
                if(window.loginState != 1) {
                    mobileLogin.showLogin();
                }
            }
        })
        // 立即评价
        $('.close-comm .btn').on('click', function() {
            if($('body').attr('device') == 'pc') {
                if(window.loginState != 1) {
                    pcLogin.showLogin();
                }else{
                    $('.close-comm').fadeOut(0, function() {
                        $('.open-comm').fadeIn(0);
                        $('.page-comment #btn').off().on('click', function() {
                            _this.addComm();
                        })
                    });
                }
            }else{
                if(window.loginState != 1) {
                    mobileLogin.showLogin();
                }else{
                    $('.close-comm').fadeOut(0, function() {
                        $('.open-comm').fadeIn(0);
                        $('.page-comment #btn').off().on('click', function() {
                            _this.addComm();
                        })
                    });
                }
            }
        });
    }
};

module.exports = comment;