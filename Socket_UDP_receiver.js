var dgram = require('dgram');

var socket = dgram.createSocket('udp4');

socket.bind(3000);

socket.on('listening', function()
{
	console.log('listening...');
})

socket.on('message', function(msg, rinfo)
{
	console.log('message received', rinfo.address, msg.toString());
});

socket.on('close', function()
{
	console.log('socket closed');
});