function TPL(html, data) {
    for (var i in data) {
        html = html.replace(new RegExp('{{\\s*' + i + '\\s*}}', 'g'), data[i]);
    }
    return html;
}

function urlQuery() {
    if (location.search) {
        var q = decodeURIComponent(location.search.substr(1));
        var obj = {};
        q.split('&').forEach(function(v) {
            var t = v.split('=');
            obj[t[0]] = t[1];
        });
        return obj;
    }
    return {};
}

function getVersionByUa() {
    var m = navigator.userAgent.match(/Chrome\/([\d.]+)/);
    if (m[1]) {
        return m[1];
    }
    return 0;
}
function verson_compare(version1, version2) {
    version2 += '';
    version1 += '';

    var a = version1.split('.'),
        b = version2.split('.'),
        i = 0,
        len = Math.max(a.length, b.length);

    for (; i < len; i++) {
        if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
            return 1;
        } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
            return -1;
        }
    }
    return 0;
}
