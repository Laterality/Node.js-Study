var net = require('net');

var server = net.createServer(function(socket)
{
	console.log('client connected');

	socket.write('Welcome to server');

	socket.on('data', function(chunk)
	{
		console.log('from Client : ', chunk.toString());
	});

	socket.on('end', function()
	{
		console.log('connection FIN');
	});
});

server.on('listening', function()
{
	console.log('server is listening');
});

server.on('close', function()
{
	consoloe.log('server closed');
});

server.listen(3000);