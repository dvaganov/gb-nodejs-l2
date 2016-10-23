var fs = require('fs');

fs.writeFile('some.ks', 'text', function(err) {
    console.log(err);
});

