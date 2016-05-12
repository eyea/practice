var header = require('./header/header.js'),
	footer = require('./footer/footer.js'),
	login = require('./login/index.js'),
	side  = require('./side/side.js'),
	comment = require('./comment/comment.js'),
	activityDetail = require('./activityDetail/activityDetail.js');

header.init();
footer.init();
side.init();
activityDetail.init();
login.init();
comment.init();