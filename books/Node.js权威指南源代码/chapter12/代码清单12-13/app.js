var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("What do you think of node.js? ", function(answer) {
    console.log("谢谢您的回答，您的评价为:", answer);
    rl.close();
});






