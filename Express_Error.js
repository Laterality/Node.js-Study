var express = require('express');
var app = express();

app.get('/:value', work);

app.listen(3000);


function work(req, res, next)
{
	var val = parseInt(req.params.value);

	if(!val)
	{
		res.status(400).send('입력값이 숫자가 아닙니다');
		var error = new Error();
		next(eror);
		return;
	}

	res.send('Result : ' + val);
}

function errorHandler(err, req, res, next)
{
	res.send('Error!');
}