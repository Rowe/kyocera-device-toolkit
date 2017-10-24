const http = require('http');
const https = require('https');
const url = require('url');
const parseString = require('xml2js').parseString;
const fs = require('fs');
const Log = require('log');
const log = new Log('info', fs.createWriteStream('runtime/app.log', {flags: 'a'}));

function post(options, postData, callback) {

    var reqProtocal = http;
    if (options.protocol == "https:") {
        reqProtocal = https;
    }

    const req = reqProtocal.request(options, function (res) {

        if (res.statusCode == 307) {
            //console.dir(url.parse(res.headers.location));
            redirectURL = url.parse(res.headers.location);
            options.host = redirectURL.hostname;
            options.port = redirectURL.port;
            options.path = redirectURL.path;
            options.protocol = redirectURL.protocol;
            post(options, postData, callback);
            return;
        }
        else if (res.statusCode == 200) {
            var responseXML = "";

            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                responseXML += chunk;
            });
            res.on('end', () => {
                log.info(`STATUS:${res.statusCode}  HEADERS:${JSON.stringify(res.headers)}  BODY:${responseXML}`);
                parseString(responseXML, function (err, result) {
                    const soapBody = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'];
                    callback(soapBody);
                });
            });
        }
        else {
            //TODO
        }

    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    req.write(postData);

    req.end();
}


exports.post = post;