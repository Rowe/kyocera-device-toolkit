const http = require('http');
const url = require('url');
const querystring = require('querystring');
const device = require("./device");

function start() {
    http.createServer(function (request, response) {

        if (request.method === 'GET') {

            var requestURL = url.parse(request.url);
            strObj = querystring.parse(requestURL.query);

            console.dir(strObj);
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
    }).listen(8888);
}

exports.start = start;