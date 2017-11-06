const fs = require('fs');
const Log = require('log');
module.exports = new Log('info', fs.createWriteStream('runtime/app.log', {flags: 'a+'}));