function task1(callback)
{
	console.log('task 1 start');
	setTimeout(function()
	{
		console.log('task 1 end');
		callback();
	}, 300);
}


function task2(callback)
{
	console.log('task 2 start');
	setTimeout(function()
	{
		console.log('task 2 end');
	//	callback();
	}, 200);
}

task1(task2);