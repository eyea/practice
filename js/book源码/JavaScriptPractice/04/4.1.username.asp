<%
'定义变量
Dim names,k,has,i
'用数组模拟一个已存在值
	names = Array("z3f","admin","test","anna","cindy","diana")
'获取传过来的参数
	k = request("key")
	has = 0
	i = 0
'循环匹配是否已存在
For i=0 To 5 
	If has <> 1 Then 
		If names(i) = k Then has = 1
	End  If 
	i = i + 1
Next 
'根据判断返回结果信息，且是JSON字符串
If has = 1 Then 
	Response.write "{success:false}"
Else 
	Response.write "{success:true}"
End If 
%>