/**
 * @ignore  ====================================================================
 * @fileoverview 网站侧边栏
 * @author  dongjie@xfz.cn
 * @version 1.0.0
 * @ignore  created in 2015-11-27
 * @ignore  depend jquery
 * @ignore  ====================================================================
 */

var sideTpl = require('../tpl/side/side.html');

var side = {
    init : function() {
        this.getSide();
    },

    getSide : function() {
        var data = {
            p : 1,
            n : 5
        };

        $.ajax({
            url: '/api/website/actives/',
            type: 'GET',
            dataType: 'json',
            data: data,
            success: function(res) {
                if(res.code == "200") {

                    var sideActivityList = res.data;
                    var today = Date.parse(new Date());
                    // deal time
                    for(var i=0,len=sideActivityList.length,str,cur,timeStatus,sideStrLen;i<len;i++) {
                        str = sideActivityList[i].begin_time.split(' ')[0];
                        cur = Date.parse(new Date(str.replace(/-/g,"/")));
                        if(cur < today) {
                            timeStatus = "0";
                        }else{
                            timeStatus = "1";
                        }

                        // 截取字数
                        if(sideActivityList[i].title.length > 21) {
                            sideStrLen = sideActivityList[i].title.substring(0,20) + '...';
                        }
                        sideActivityList[i].begin_time = timeStatus;
                        sideActivityList[i].title = sideStrLen;

                    } 
                    

                    var render = template.compile(sideTpl),
                        html = render({
                            sideData : sideActivityList
                        });
                    $('#side').html(html);
                }
            }
        });
    }
};

module.exports = side;