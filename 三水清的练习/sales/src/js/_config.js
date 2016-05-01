var APIURL = 'http://zhufu.sinaapp.com/api';
var ls = window.localStorage;
if (ls.APIURL) {
    APIURL = ls.APIURL;
}

//关键词
var VERSION = chrome.runtime.getManifest().version;
var APIURL_INFO = 'http://zhufu.sinaapp.com/api/get-api-url.php?v=' + VERSION;
$.getJSON(APIURL_INFO, function(data) {
    if (data.errno === 0 && data.api_url && /^http[s]:\/\//.test(data.api_url)) {
        APIURL = data.api_url;
        ls.APIURL = APIURL;
    }
});
var ss = window.sessionStorage;
var settings = ls.settings ? ls.settings : '{}';
var keywords = ls.keywords ? ls.keywords : '[]';
try {
    settings = JSON.parse(settings);
} catch (e) {
    settings = {};
    ls.settings = '{}';
}
try {
    keywords = JSON.parse(keywords);
} catch (e) {
    keywords = [];
    ls.keywords = '[]';
}
settings = $.extend({
    "openKeyword": true,
    "openMusic": true,
    "beQuiet": true,
    "openNotice": true,
    "hitaoNotice": true
}, settings);
var emptyFn = function() {};
