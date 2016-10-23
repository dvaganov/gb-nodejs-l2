var readline = require('readline');
var gameTable = require('./gametable.js');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Вы хотите начать игру? 1 - да\n', function(answer) {
    if (answer === '1') {
        gameTable.startRound();
        console.log(gameTable.getStatus());
    } else {
        rl.close();
    }
});
