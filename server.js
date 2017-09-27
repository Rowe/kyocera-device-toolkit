var http = require('http');

http.createServer(function (request, response) {

    if (request.method === 'GET' && request.url === '/echo') {
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


console.log('Server running at http://127.0.0.1:8888/');