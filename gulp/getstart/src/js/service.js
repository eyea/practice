var header = require('./header/header.js'),
	footer = require('./footer/footer.js'),
	login = require('./login/index.js'),
	service = require('./service/service.js');

header.init();
footer.init();
service.init();
login.init();