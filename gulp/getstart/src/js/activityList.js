var side  = require('./side/side.js'),
	header = require('./header/header.js'),
	login = require('./login/index.js'),
	footer = require('./footer/footer.js'),
	activityList = require('./activityList/activityList.js');

header.init();
footer.init();
side.init();
activityList.init();
login.init();