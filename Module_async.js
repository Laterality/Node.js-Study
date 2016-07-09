function task1(callback)
{
	console.log('task 1 start');
	setTimeout(function()
	{
		console.log('task 1 end');
		callback(null, 'task 1 result');
	}, 300);
}


function task2(callback)
{
	console.log('task 2 start');
	setTimeout(function()
	{
		console.log('task 2 end');
		callback(null, 'task 2 result');
	}, 300);
}


var async = require('async');
async.series([task1, task2],
function(err, results)
{
	console.log('async task all finished', results);
})