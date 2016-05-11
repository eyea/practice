/**
 * 路由逻辑
 */
var feListMock = require('../mock/feList');
var serverMock = require('../mock/serverList');
var otherMock = require('../mock/otherList');

module.exports = function(app) {
	/***** url链接跳转******/
	// 首页
	app.get('/', function(req, res) {
		res.render('index',{});
	});
	// 前端
	app.get('/fe/', function(req, res) {
		res.render('index', {});
	});
	// 后端
	app.get('/server/', function(req, res) {
		res.render('server', {});
	});
	// 杂谈
	app.get('/other/', function(req, res) {
		res.render('other', {});
	});
	/**********end***********/

	/*********接口url**********/
	app.get('/api/feList/', function(req, res) {
		res.send(feListMock);
	});
	app.get('/api/serverList/', function(req, res) {
		res.send(serverMock);
	});
	app.get('/api/otherList/', function(req, res) {
		res.send(otherMock);
	});
}