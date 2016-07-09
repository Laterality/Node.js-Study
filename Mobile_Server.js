var http = require('http');

var movieList = [{title : '인터스텔라', director:'크리스토퍼 놀란'}];

http.createServer(function(req, res)
{
	if(req.method.toLowerCase() == 'post')
	{
		var buffer = '';
		req.on('data', function(chunk)
		{
			buffer += chunk;
		});

		req.on('end', function()
		{
			var parsed = JSON.parse(buffer);
			var title = parsed.title;
			var director = parsed.director;

			movieList.push({title : title, director : director});

			res.writeHead(200, {'Content-Type':'application/json'});
			res.end(JSON.stringify({result:'success'}));
		});
	}
	else
	{
		var result = 
		{
			count : movieList.length,
			data : movieList
		};
		res.writeHead(200, {'Content-Type' : 'application/json'});
		res.end(JSON.stringify(result));
	}
}).listen(3000);