(function() {
    function isPc() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
                    "SymbianOS", "Windows Phone",
                    "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                autoWidth();
                break;
            }else{
                flag = true;
            }
        }
            
    }
    // 适应屏幕宽度
    function autoWidth() {
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
    }
    isPc();
})();