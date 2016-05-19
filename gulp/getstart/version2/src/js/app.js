var header = require('./header/header.js'),
	footer = require('./footer/footer.js'),
	login = require('./login/index.js'),
	app = require('./app/app.js');

header.init();
footer.init();
app.init();
login.init();