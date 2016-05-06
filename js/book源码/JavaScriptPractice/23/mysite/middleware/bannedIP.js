module.exports = function(req, res, next){
  var ips = ['127.0.0.1','192.168.0.52'];
  if(ips.indexOf(req.connection.remoteAddress)>-1){
	  res.write('test');
	res.end('STOP');
  }else{
	next();
  }
};