var header = require('./header/header.js'),
    footer = require('./footer/footer.js'),
    login = require('./login/index.js'),
    poker = require('./poker/poker.js');

header.init();
footer.init();
poker.init();
login.init();