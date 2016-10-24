var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function BlackJack() {
    var _inLoop = false;
    var _gameTable = null;

    this.run = function() {
        _inLoop = true;

        rl.on('line', function(input) {
            if (input.toLowerCase() === 'c')
                rl.close();
        });

        _startNewGame();
    }

    this.setGameTable = function(gameTable) {
        _gameTable = gameTable;
        return this;
    }

    var _startNewGame = function() {
        rl.question('Вы хотите начать игру? [Д/н] ', function(answer) {
            if (answer.toLowerCase() === 'н' || answer.toLowerCase() === 'n') {
                rl.close();
            } else {
                _gameTable.startRound();
                console.log(_gameTable.getStatus());
                if (_inLoop)
                    _choose();
            }
        });
    }

    var _choose = function() {
        rl.question('Продолжаем? [д/Н] ', function(answer) {
            if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'д') {
                _gameTable.continueRound();
            } else {
                _inLoop = false;
                console.log(_gameTable.endRound());
            }
            console.log(_gameTable.getStatus());
        });
    }
}

module.exports = new BlackJack();
