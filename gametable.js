function GameTable() {
    var inProcess = false;
    var cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    var dealer = [];
    var player = [];

    var that = this;

    var getCard = function() {
        var min = 0, max = cards.length - 1;
        var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
        return cards[randNum];
    };

    this.getCardSum = function(cardSet) {
        var result = 0;

        for (var i = 0; i < cardSet.length; i++) {
            switch(cardSet[i]) {
                case 'J':
                case 'Q':
                case 'K':
                    result += 10;
                    break;
                case 'A':
                    break;
                default:
                    result += parseInt(cardSet[i], 10);
                    break;
            }
        }

        return result;
    }

    this.startRound = function() {
        dealer = [];
        player = [];

        dealer.push(getCard());
        player.push(getCard(), getCard());

        return this;
    };

    this.getStatus = function() {
        var status = '\nДилер: ' + dealer.join(' ') + ' (' + this.getCardSum(dealer) + ')'
            + '\nИгрок: ' + player.join(' ') + ' (' + this.getCardSum(player) + ')\n';
        return status;
    };

    this.continueRound = function() {
        player.push(getCard());
    };

    this.endRound = function() {
        return 'End round';
    };

}

module.exports = new GameTable();
