const http = require('http');
const url = require('url');
const querystring = require('querystring');
const device = require("./device");

function start(route) {

    function onRequest(request, response) {
        if (request.method === 'GET') {

            var requestURL = url.parse(request.url);
            params = querystring.parse(requestURL.query);

            if (params.host != undefined) {
                console.dir(params);
                console.dir((function () {
                    device.info('10.170.80.151')
                })());
            }
            response.write('<html>');
            response.write('<body>');
            response.write('<h1>Hello, World!</h1>');

            response.write('</body>');
            response.write('</html>');
            response.end();
        } else {
            response.statusCode = 404;
            response.end();
        }
    }

    http.createServer(onRequest).listen(8888);
}

exports.start = start;