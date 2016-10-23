function GameTable() {
    var cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    var dealer = [];
    var player = [];

    var getCard = function() {
        var min = 0, max = cards.length - 1;
        var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
        return cards[randNum];
    };

    this.startRound = function() {
        dealer = [];
        player = [];

        dealer.push(getCard());
        player.push(getCard(), getCard());

        return this;
    };

    this.getStatus = function() {
        var status = '\nДилер: ' + dealer.join(' ') + '\nИгрок: ' + player.join(' ');
        return status;
    };

    this.continueRound = function() {
        getCard(player);
    };

    this.endRound = function() {
        console.log('End round');
    };

    this.getResult = function() {
        console.log('Result');
    }
}

module.exports = new GameTable();
