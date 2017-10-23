const http = require('http');
const url = require('url');
const querystring = require('querystring');
const soapRequest = require('./soap/soap_request');

function start(route) {

    function onRequest(request, response) {
        if (request.method === 'GET') {

            var requestURL = url.parse(request.url);
            params = querystring.parse(requestURL.query);

            if (params.host != undefined) {
                switch (params.action) {
                    case 'panel':
                        soapRequest.getPanelInfo(params.host, function (res) {
                            onResponse(res, response);
                        });
                        break;
                    case 'tonner':
                        soapRequest.getTonerInfo(params.host, function (res) {
                            onResponse(res, response);
                        });
                        break;
                    case 'cassette':
                        soapRequest.getCassetteInfo(params.host, function (res) {
                            onResponse(res, response);
                        });
                        break;
                    case 'counter':
                        soapRequest.getDeviceCounter(params.host, function (res) {
                            onResponse(res, response);
                        });
                        break;
                    case 'auth_sta':
                        soapRequest.getAuthenticationStatus(params.host, function (res) {
                            onResponse(res, response);
                        });
                        break;
                    default:
                        break;
                }

            }
        } else {
            response.statusCode = 404;
            response.end();
        }
    }

    http.createServer(onRequest).listen(8888);
}

function onResponse(res, response) {
    response.write(res);
    response.end();
}

exports.start = start;