<%
set xmldoc = Server.CreateObject("Microsoft.XMLDOM")
xmldoc.async=false
xmldoc.load(request)

for each x in xmldoc.documentElement.childNodes
   if x.NodeName = "to" then name=x.text
next
response.write(name)
%>