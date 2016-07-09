var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res)
{
	fs.access('./img/sample.png', function(err)
	{
		if(err)
		{
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.readFile('./img/sample.png', function(err, data)
		{
			res.end(data);
		});
	});
}).listen(3000);