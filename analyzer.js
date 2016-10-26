var fs = require('fs');

var logFile = process.argv[2];
var stats = getStat(parse(logFile));

console.log('Статистика игр из файла: %s.', logFile);
console.log(
    'Всего было сыграно %d партий. Из них вы победили %d раз, а проиграли %d.',
    stats.total,
    stats.wins,
    stats.looses
);
console.log(
    'Подряд вы побеждали %d раз, а проигрывали %d.',
    stats.winsIAR,
    stats.loosesIAR
);
console.log(
    'У вас всего было %d BlackJack. А соотношение побед к проигрышам составил %d.',
    stats.blackJack,
    stats.wins / stats.looses
);

// Парсит входящий файл в массив
function parse(logFile) {
    var parsedData = null;

    try {
        parsedData = fs.readFileSync(logFile).toString().split('');
    } catch (err) {
        console.log('Указанного файла не существует');
    }

    return Array.isArray(parsedData) ? parsedData : [];
}

// Получаем статистику по входящему массиву
function getStat(data) {
    // Объект статистики
    var result = {
        total: data.length,
        wins: 0,
        looses: 0,
        draw: 0,
        blackJack: 0,
        winsIAR: 0,
        loosesIAR: 0
    };

    // Необходимы для проверки максимальной длины побед\проигрышей подряд
    var winsIAR = 0,
        loosesIAR = 0;

    for (var i = 0; i < data.length; i++) {
        switch(data[i]) {
            case 'b':
                result.blackJack++;
            case 'w':
                result.wins++;
                winsIAR++;
                break;
            case 'l':
                result.looses++;
                loosesIAR++;
                break;
            case 'd':
                result.draw++;
                break;
        }

        if (winsIAR > result.winsIAR) {
            result.winsIAR = winsIAR;
            winsIAR = 0;
        }

        if (loosesIAR > result.loosesIAR) {
            result.loosesIAR = loosesIAR;
            loosesIAR = 0;
        }

    }

    return result;
}
