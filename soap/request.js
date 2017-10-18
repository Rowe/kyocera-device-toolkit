const http = require('http');
const https = require('https');
const url = require('url');
const parseString = require('xml2js').parseString;

function post(options, postData, callback) {

    var requestProtocal = http;
    if (options.protocol == "https:") {
        requestProtocal = https;
    }

    const req = requestProtocal.request(options, function (res) {

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

        if (res.statusCode == 200) {
            var responseXML = "";

            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                responseXML += chunk;
            });
            res.on('end', () => {
                parseString(responseXML, function (err, result) {
                    const soapBody = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'];
                    callback(soapBody);
                });
            });
        }
        else {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        }

    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    req.write(postData);

    req.end();
}


exports.post = post;