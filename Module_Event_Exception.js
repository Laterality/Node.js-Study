process.on('uncaughtException', function(code)
{
	console.log('uncaughtException');	
});

doSomething();