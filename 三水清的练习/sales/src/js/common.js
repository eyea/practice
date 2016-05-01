(function() {
    //= include _tpl.js
    //= include _config.js

    $('#J-about').on('show', function() {
        $.get(APIURL + '/changelog.php?v=' + VERSION, function(data) {
            $('#J-changelog').html(data);
        })
    });

    $('#J-about .nav-tabs a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });
    var version = VERSION;
    $('#J-version').html('<p>当前版本 V' + version + '</p>');
    $('#J-update-btn').click(function() {
        var $t = $(this);
        $t.button('loading');
        $.ajax({
            url: APIURL + '/update.php?prodversion=' + getVersionByUa() + '&lang=' + navigator.language + '&v=' + version,
            dataType: 'json',
            success: function(json) {
                if (!json) {
                    $('#J-update-info').html('检查失败，请稍后再试').addClass('error');
                    return;
                }
                var xmlVersion = json.version;
                var xmlStatus = json.status;
                var downloadURL = json.downloadURL;
                if (xmlStatus === 'noupdate') {
                    //已经是最新版
                    $('#J-update-info').html('已经是最新版').removeClass('error');
                } else if (xmlVersion) {
                    var v = verson_compare(xmlVersion, version);
                    if (v > 0) {
                        //有更新
                        $('#J-update-info').html('发现最新版本：v' + xmlVersion + '，<a target="_blank" class="btn btn-info" href="' + downloadURL + '">立即更新</a>').removeClass('error');
                    } else if (v === 0) {
                        //已经是最新版
                        $('#J-update-info').html('已经是最新版').removeClass('error');
                    } else {
                        //测试版？
                        $('#J-update-info').html('额，难道是传说中的测试版？').removeClass('error');
                    }
                } else {
                    $('#J-update-info').html('已经是最新版').removeClass('error');
                }

                $t.button('reset');
            },
            timeout: 3000,
            error: function() {
                $('#J-update-info').html('检查失败，请稍后再试').addClass('error');
                $t.button('reset');
            }
        });
    });

    $('#J-send-mail').click(function() {
        if ($('#J-mybug').val().length < 10) {
            alert('多写两句再发送吧~');
            $('#J-mybug').focus();
            return;
        }
        var $t = $(this);
        $t.button('loading');
        $.post(APIURL + '/mail.php?v=' + VERSION, {
            content: encodeURIComponent('版本号：' + VERSION + ';;;' + $('#J-mybug').val()),
            email: encodeURIComponent($('#J-email').val())
        }).done(function() {
            $t.button('reset');
            $('#J-mybug').val('');
            alert('发送成功，谢谢您的反馈~');
        });
    });

    $('#J-like').click(function() {
        chrome.tabs.create({
            url: $(this).data('link')
        });
    });
}());
