var header = require('./header/header.js'),
	footer = require('./footer/footer.js'),
	login = require('./login/index.js'),
	comment = require('./comment/comment.js'),
	course = require('./course/course.js');

header.init();
footer.init();
course.init();
login.init();
comment.init();