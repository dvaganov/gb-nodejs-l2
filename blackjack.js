var readline = require('readline');
var fs = require('fs');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function BlackJack() {
    var _inGame = false;
    var _gameTable = null;
    var _logFile;

    this.run = function(logFile) {
        _logFile = logFile;
        rl.write('+++Добро пожаловать в игру BlackJack!+++\n');
        _startNewGame();
    };

    this.setGameTable = function(gameTable) {
        _gameTable = gameTable;
        return this;
    };

    var _startNewGame = function() {
        rl.write('\n');
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

        if (!_inGame || (_inGame && status !== _gameTable.STATUS_NONE)) {
            _endGame(status);
        }

        if (_inGame) {
            rl.question('Ещё одну? [д/Н] ', function(answer) {
                if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'д') {
                    _gameTable.continue();
                } else {
                    _inGame = false;
                    _gameTable.end();
                }
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
            case _gameTable.STATUS_DRAW:
                result = 'На этот раз все остались при своём.';
                log = 'd';
                break;
        }

        rl.write(result + '\n');

        if (typeof _logFile !== 'undefined')
            fs.appendFile(_logFile, log, function(err) {
                if (err)
                    throw err;
            });

        _inGame = false;
        _startNewGame();
    };
}

module.exports = new BlackJack();
