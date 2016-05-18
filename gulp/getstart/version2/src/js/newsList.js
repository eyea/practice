var side = require('./side/side.js'),
	header = require('./header/header.js'),
	footer = require('./footer/footer.js'),
	login = require('./login/index.js'),
	banner = require('./newsList/banner.js'),
	newsList = require('./newsList/newsList.js');

header.init();
footer.init();
banner.init();
side.init();
newsList.init();
login.init();