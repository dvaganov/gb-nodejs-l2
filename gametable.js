function GameTable() {
    var cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    var dealer = [];
    var player = [];

    this.STATUS_NONE = 0;
    this.STATUS_GAME_OVER = 1;
    this.STATUS_DEALER_WIN = 2;
    this.STATUS_PLAYER_WIN = 3;
    this.STATUS_PLAYER_BLACK_JACK = 4;
    this.STATUS_DEALER_BLACK_JACK = 5;

    var getCard = function() {
        var min = 0, max = cards.length - 1;
        var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
        return cards[randNum];
    };

    var getCardSum = function(cardSet) {
        var result = 0;
        var amountA = 0;

        for (var i = 0; i < cardSet.length; i++) {
            switch(cardSet[i]) {
                case 'J':
                case 'Q':
                case 'K':
                    result += 10;
                    break;
                case 'A':
                    amountA++;
                    break;
                default:
                    result += parseInt(cardSet[i], 10);
                    break;
            }
        }

        // It's unique rules for ace
        for (var i = 0; i < amountA; i++) {
            if (result <= 10)
                result += 11;
            else
                result++;
        }

        return result;
    }

    this.start = function() {
        dealer = [];
        player = [];

        dealer.push(getCard());
        player.push(getCard(), getCard());

        return this;
    };

    this.getInfo = function() {
        var result = {
            dealer: {
                cardSet: dealer.join(' '),
                cardSum: getCardSum(dealer)
            },
            player: {
                cardSet: player.join(' '),
                cardSum: getCardSum(player)
            }
        };

        return result;
    };

    this.continue = function() {
        player.push(getCard());
        return this;
    };

    this.end = function() {
        while (getCardSum(dealer) <= 17) {
            dealer.push(getCard());
        }
        return this;
    };

    // Main game rules
    this.getStatus = function() {
        var result = this.STATUS_NONE;

        var playerCardSum = getCardSum(player);
        var dealerCardSum = getCardSum(dealer);

        if (playerCardSum === 21) {
            result = this.STATUS_PLAYER_BLACK_JACK;
        } else if (playerCardSum > 21) {
            result = this.STATUS_DEALER_WIN;
        } else {
            if (dealerCardSum === 21) {
                result = this.STATUS_DEALER_BLACK_JACK;
            } else if (dealerCardSum > 21) {
                result = this.STATUS_PLAYER_WIN;
            } else if (dealerCardSum > playerCardSum) {
                result = this.STATUS_DEALER_WIN;
            }
        }

        return result;
    };

}

module.exports = new GameTable();
