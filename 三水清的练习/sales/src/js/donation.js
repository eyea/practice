//= include _tpl.js
//= include _config.js
//
$.get(APIURL + '/donation.php?v=' + VERSION, function (data) {
    $('#J-content').html(data);
});
