jQuery(document).ready(function($) {
    
    var crq = {
        init : function() {
            this.isPc();
            this.bind();
            $('.footer .icon_home').removeClass('home').addClass('home_active');
            $('.footer .text_home').removeClass('home').addClass('home_text');
        },
        isPc : function() {
            var _this = this;
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                        "SymbianOS", "Windows Phone",
                        "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    _this.autoWidth();
                    break;
                }else{
                    flag = true;
                }
            }
        },
        autoWidth : function() {
            var docEle = document.documentElement,
                initWidth = 320, initSize = 100,
                resizeEvent = 'orientationchange' in window ?'orientationchange' : 'resize';

            var container = document.getElementById('wrapper');

            function init(win) {
              var w = win.innerWidth,
                  h = win.innerHeight;

              docEle.style.fontSize = w / initWidth * initSize + 'px';
              container.style.height = h + 'px';
            }

            window.addEventListener('orientationchange', function(e) {
              e.preventDefault();
              if (Math.abs(window.orientation) === 90) {
                alert('为了您更好的体验，请不要使用横屏浏览');
              }
            }, false);

            window.addEventListener(resizeEvent, function(e) {
              init(window);
            }, false);

            init(window);
        },
        bind: function() {
            $('.footer').on('click', 'li', function() {
                var $self = $(this);
                var id = $self.data('id');
                $self.find('.icon_'+id).removeClass(id).addClass(id+'_active');                   ;
                $self.find('.text_'+id).removeClass('.text_'+id).addClass(id+'_text');
                for(var i=0,len=$self.siblings().length;i<len;i++) {
                    $self.siblings().eq(i).find('.icon_'+$self.siblings().eq(i).data('id'))
                         .removeClass($self.siblings().eq(i).data('id')+'_active')
                         .addClass($self.siblings().eq(i).data('id'));
                    $self.siblings().eq(i).find('.text_'+$self.siblings().eq(i).data('id'))
                         .removeClass($self.siblings().eq(i).data('id')+'_text')
                         .addClass($self.siblings().eq(i).data('id'));
                }
            })
        }
    }

    crq.init();
});