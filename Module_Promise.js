function task1(fulfill, reject)
{
	console.log('task 1 start');
	setTimeout(function()
	{
		console.log('task1 end');
		fulfill('task1 result');
		
	}, 300);
}

function fulfilled(result)
{
	console.log('fulfilled : ', result);
}

function rejected(err) 
{
	console.log('rejected : ', err);
}

new Promise(task1).then(fulfilled, rejected);