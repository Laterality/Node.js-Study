var fs = require('fs');

fs.readFile('./test.txt', 'utf-8', function(err, data)
{
	if(err)
	{
		console.error('File Read Error : ', err);
		return;
	}
	console.log('File : ', data);
});


var data = fs.readFileSync('./test.txt', 'utf-8')
console.log('File with Sync : ', data);