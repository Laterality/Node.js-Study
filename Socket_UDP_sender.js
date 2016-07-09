var dgram = require('dgram');

var socket = dgram.createSocket('udp4');

var msg = new Buffer('Hello world');
socket.send(msg, 0, msg.length, 3000, '127.0.0.1',
function(err)
{
	console.log('err');
	if(err)
	{
		console.log('UDP sending message error');
		return;
	}
	console.log('message sent');
	socket.close();
});