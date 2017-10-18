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
                if (params.action == 'panelinfo') {
                    soapRequest.getPanelInfo(params.host, function (res) {
                        response.write(res);
                        response.end();
                    });
                }
                if (params.action == 'tonerinfo') {
                    soapRequest.getPanelInfo(params.host, function (res) {
                        response.write(res);
                        response.end();
                    });
                }
            }
        } else {
            response.statusCode = 404;
            response.end();
        }
    }

    http.createServer(onRequest).listen(8888);
}

exports.start = start;