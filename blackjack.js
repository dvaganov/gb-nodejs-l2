var readline = require('readline');
var fs = require('fs');

// Setup readline interface
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// BlackJack game class.
function BlackJack() {
    var _inGame = false;
    var _gameTable = null;
    var _logFile;

    this.run = function() {
        rl.write('+++Добро пожаловать в игру BlackJack!+++\n');
        _startNewGame();
        return this;
    };

    this.withLog = function(logFile) {
        _logFile = logFile;
        return this;
    };

    this.setGameTable = function(gameTable) {
        _gameTable = gameTable;
        return this;
    };

    var _startNewGame = function() {
        rl.write('\n');

        // Default yes. If no - end program.
        rl.question('Раздаём карты? [Д/н] ', function(answer) {
            if (answer.toLowerCase() === 'н' || answer.toLowerCase() === 'n') {
                rl.close();
            } else {
                _inGame = true;
                _gameTable.start();
                _nextTurn();
            }
        });
    };

    var _nextTurn = function() {
        var info = _gameTable.getInfo();
        var status = _gameTable.getStatus();

        rl.write('=====\n');
        rl.write('Дилер: ' + info.dealer.cardSet + ' (' + info.dealer.cardSum + ')\n');
        rl.write('Игрок: ' + info.player.cardSet + ' (' + info.player.cardSum + ')\n');
        rl.write('=====\n');

        // Show result if game is end or player has blackjack or he bust while in game
        if (!_inGame || (_inGame && status !== _gameTable.STATUS_NONE)) {
            _endGame(status);
            _inGame = false;
        }

        if (_inGame) {
            // Default is No.
            rl.question('Ещё одну? [д/Н] ', function(answer) {
                if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'д') {
                    _gameTable.continue();
                } else {
                    _inGame = false;
                    _gameTable.end();
                }
                // Recursive call instead of loop with sync functions
                _nextTurn();
            });
        }
    };

    var _endGame = function(status) {
        var result = '';
        var log = '';

        switch(status) {
            case _gameTable.STATUS_PLAYER_WIN:
                result = 'Поздравляем! Вы победили.';
                log = 'w';
                break;
            case _gameTable.STATUS_DEALER_WIN:
            case _gameTable.STATUS_GAME_OVER:
                result = 'Увы, вы проиграли.';
                log = 'l';
                break;
            case _gameTable.STATUS_PLAYER_BLACK_JACK:
                result = 'Ура! У вас BlackJack!';
                log = 'b';
                break;
            case _gameTable.STATUS_DEALER_BLACK_JACK:
                result = 'Ухх! У дилера BlackJack. Увы.';
                log = 'l';
                break;
            case _gameTable.STATUS_NONE:
                result = 'На этот раз все остались при своём.';
                log = 'd';
                break;
        }

        rl.write(result + '\n');

        if (_logFile)
            fs.appendFile(_logFile, log, function(err) {
                if (err)
                    throw err;
            });

        // Ask user for new game.
        _startNewGame();
    };
}

module.exports = new BlackJack();
