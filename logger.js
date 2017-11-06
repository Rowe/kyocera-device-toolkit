const fs = require('fs');
const Log = require('log');
const log = new Log('info', fs.createWriteStream('runtime/app.log', {flags: 'a'}));

function info(){

}