
define("fixZIndex", ["$node"], function( $ ){
    //http://brenelz.com/blog/squish-the-internet-explorer-z-index-bug/
    $.fn.fixZIndex = function(opts) {
        opts = opts || {};
        if (opts.IEonly && !window.VBArray) 
            return this;
      
        for (var i = 0, el; el = this[i++];) {
            var config_recursive = opts.recursive || true;
            var config_exclude = opts.exclude || null;
            while (el != document.body) {
                if (!$(el).hasClass(config_exclude) &&  /relative|absolute/.test( $(el).css('position') ) ) {
                    if ($.data(el, 'zIndex') == undefined) {
                        $.data(el, 'zIndex', el.style.zIndex || -1);
                    }
                    el.style.zIndex = opts.zIndex || '9999';
                }
                el = el.parentNode;
                if (!config_recursive) break;
            }
        }
        return this;
    };

    // 还原原来的z-index
    $.fn.restoreZIndex = function(opts) {
        opts = opts || {};
        if (opts.IEonly && !window.VBArray) 
            return this;
        for (var i = 0, el; el = this[i++];) {
            var config_exclude = opts.exclude || null;
            while (el && el != document.body) {
                var currZIndex = $.data(el, 'zIndex');
                if (currZIndex > -1 && !$(el).hasClass(config_exclude)) {
                    el.style.zIndex = currZIndex;
                    $.removeData(el, 'zIndex');
                }
                else if (currZIndex == -1) {
                    el.style.zIndex = '';
                }
                el = el.parentNode;
            }
        }
        return this;
    };
    return $;
})