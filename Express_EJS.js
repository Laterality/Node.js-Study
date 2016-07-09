var express = require('express');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var data = 
[
	{title : '인터스텔라', director : '크리스토퍼 놀란'},
	{title : '트랜스포머', director : '마이클 베이'}
];

app.use(express.static('./'));
app.get('/', function(req, res)
{
	res.render('movie', {title:'Movies', movies:data});
});

app.listen(3000);