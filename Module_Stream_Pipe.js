var fs = require('fs');

var os = fs.createWriteStream('./output2.txt');

os.on('finish', function()
{
	console.log('finish');
});

var is = process.stdin;

is.pipe(os);