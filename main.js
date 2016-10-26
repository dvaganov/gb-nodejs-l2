var blackjack = require('./blackjack.js');
var gameTable = require('./gametable.js');

var logFile = process.argv[2];

blackjack
    .setGameTable(gameTable)
    .withLog(logFile)
    .run();
