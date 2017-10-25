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

            redirectURL = url.parse(res.headers.location);
            options.host = redirectURL.hostname;
            options.port = redirectURL.port;
            options.path = redirectURL.path;
            options.protocol = redirectURL.protocol;
            post(options, postData, callback);
            return;
        }
        else if (res.statusCode == 200) {
            var responseXML = '';

            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                responseXML += chunk;
            });
            res.on('end', () => {
                log.info(`RESPONSE | STATUS:${res.statusCode}  HEADERS:${JSON.stringify(res.headers)}  BODY:${responseXML}`);
                parseString(responseXML, {explicitArray: false}, function (err, json) {
                    callback(json['SOAP-ENV:Envelope']['SOAP-ENV:Body']);
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
    log.info(`REQUEST | OPTIONS:${JSON.stringify(options)}  BODY:${postData.replace(/\n/)}`);

    req.end();
}

function getRequestOptions(host, path) {
    return {
        host: host,
        port: 9090,
        method: 'POST',
        rejectUnauthorized: false,
        protocol: 'http:',
        path: path,
        headers: {
            'Host': '' + host + ':' + 9090,
            'Content-Type': 'application/soap+xml; charset=utf-8',
            'Connection': 'close'
        }
    }
}


exports.post = post;
exports.getOptions = getRequestOptions;

