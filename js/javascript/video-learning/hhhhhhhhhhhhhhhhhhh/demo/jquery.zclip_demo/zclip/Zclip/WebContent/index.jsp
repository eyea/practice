<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<title>演示：复制页面内容到剪贴板兼容各浏览器</title>
<style type="text/css">
.demo{width:760px; margin:40px auto 0 auto; min-height:150px;}
textarea{width:100%; height:80px; border:1px solid #ddd; color:#666}
#para{line-height:24px; background:#f7f7f7; padding:10px}
.copy{line-height:32px}
#msg{margin-left:10px; color:green; border:1px solid #3c3; background:url(checkmark.png) no-repeat 2px 3px; padding:3px 6px 3px 20px}
</style>
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="js/jquery.zclip.min.js"></script>
<script type="text/javascript">
$(function(){
	$('#copy_input').zclip({
		path: 'js/ZeroClipboard.swf',
		copy: function(){
			//return $('#mytext').val();
			return '你好';
		},
		afterCopy: function(){
			$("<span id='msg'/>").insertAfter($('#scopy_input')).text('复制成功').fadeOut(2000);
		}
	});
	$('#mytext').focus(function(){
		var txt = $(this).val();
		if(txt=='请输入内容'){
			$(this).val('');
		}
	});
});
</script>
</head>
<body>
<table>
<tr>
<td>你好</td>
<td id="copy_input"><div id="main">
   <div class="demo">
        <a href="#" id="scopy_input" class="copy">复制内容</a>
   </div>
  </div></td>
</tr>
</table>
</body>
</html>