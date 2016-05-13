var side  = require('./side/side.js'),
	header = require('./header/header.js'),
	footer = require('./footer/footer.js'),
	comment = require('./comment/comment.js'),
	newsDetail = require('./newsDetail/newsDetail.js'),
	login = require('./login/index.js');

header.init();
newsDetail.init();
footer.init();
side.init();
login.init();
comment.init();