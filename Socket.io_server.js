var express = require('express');
var http = require('http');

var app = express();

var server = http.createServer(app);
server.listen(3000);


app.get('/', function(req, res)
{
	res.sendFile(__dirname + '/client.html');
});

var io = require('socket.io')(server);

io.on('connect', function(socket)
{
	console.log('connected');

	socket.on('disconnect', function()
	{
		console.log('disconnected');
	});
	setInterval(function()
	{
		socket.emit('message', 'message');
	}, 3000);
});