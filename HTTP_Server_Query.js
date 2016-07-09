var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res)
{
	// parse url
	var parsed = url.parse(req.url, true);
	var query = parsed.query;

	// get start and end
	var start = parseInt(query.start);
	var end = parseInt(query.end);

	if(!start || !end)
	{
		res.statusCode = 404;
		res.end('Wrong Parameter');
	} 
	else
	{
		// get Sum
		var sum = 0;

		for(var i = start; i <= end; i ++)
		{
			sum += i;
		}
		res.statusCode = 200;
		res.end('Result : ' + sum);
	}
}).listen(3000);