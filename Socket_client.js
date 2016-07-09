var net = require('net');

var ip = '127.0.0.1';
var port = 3000;


var socket = new net.Socket();
socket.connect({host:ip, port:port}, function()
{
	console.log('server connected');

	socket.write('Hello server');
	socket.end();

	socket.on('data', function(chunk)
	{
		console.log('from Server : ', chunk.toString());
	});

	socket.on('end', function()
	{
		console.log('connection closed');
	});
});