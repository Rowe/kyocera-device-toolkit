const http = require('http');
const url = require('url');
const querystring = require('querystring');
const api = require('./interface');
const logger = require('./logger');

function start() {
    function onRequest(request, response) {
        if (request.method === 'GET') {
            var requestURL = url.parse(request.url);
            const params = querystring.parse(requestURL.query);
            const host = params.host;
            const action = params.action;
            if (host != undefined && action != undefined) {
                switch (action) {
                    case 'panel':
                        api.getPanelInfo(host, function (res) {
                            onResponse(res, response);
                        });
                        break;
                    case 'tonner':
                        api.getTonerInfo(host, function (res) {
                            onResponse(res, response);
                        });
                        break;
                    case 'cassette':
                        api.getCassetteInfo(host, function (res) {
                            onResponse(res, response);
                        });
                        break;
                    case 'counter':
                        api.getDeviceCounter(host, function (res) {
                            onResponse(res, response);
                        });
                        break;
                    case 'restart':
                        api.restart(host, function (res) {
                            onResponse(res, response);
                        });
                        break;
                    default:
                        break;
                }
            }
        } else {
            response.statusCode = 404;

        }
    }

    http.createServer(onRequest).listen(8888);
    logger.info('The server has started at the port 8888');
}

function onResponse(res, response) {
    response.write(JSON.stringify(res));
    response.end();
}

exports.start = start;