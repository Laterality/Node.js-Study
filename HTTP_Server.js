var http = require('http');

var server = http.createServer(function(req, res)
{
	console.log('Method : ', req.method);
	console.log('url : ', req.url);
	console.log('headers : ', req.headers);

	res.write('<h1>Simple HTTP Server with Node.js</h1>');
	res.end();
}).listen(3000);