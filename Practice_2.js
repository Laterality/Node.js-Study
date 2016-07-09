var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

var data =
	[
		{movieid: 1, title : 'Avata', director : '제임스 카메론', year : 2009, review : {length : 0, reviews : []}},
		{movieid: 2, title : 'Starwars1', director : '조지 루카스', year : 1999, review : {length : 0, reviews : []}},
		{movieid: 3, title : 'Interstella', director : '크리스토퍼 놀란', year : 2014, review : {length : 0, reviews : []}}
	];

app.use(express.static('./'));
app.get('/', function(req, res)
{
	showMovieTitleList(req, res);
});

app.get('/moviedetail', function(req, res)
{
	console.log('query : ', req.query);
	showMovieDetail(req, res);
});

app.post('/:title/:path', function(req, res)
{
	console.log('post body : ', req.body);
	if(req.params.path.toLowerCase() == 'addreview')
	{
		addMovieReview(req, res);
	}

});



app.listen(3000);


function showMovieTitleList(req, res)
{
	var titles = [];

	data.forEach(function (item)
	{
		titles.push(item.title);
	});

	console.log('body : ', req.body);
	if(String(req.body.format).toLowerCase() == 'json')
	{
		res.send(JSON.stringify(titles));
	}
	else
	{
		res.render('index', {titles : titles});
	}
}

function showMovieDetail(req, res)
{
	data.forEach(function (item)
	{
		if(item.title == req.query.title){console.log('return : ', item); res.render('moviedetail', {data : item});}
	});

}

function addMovieReview(req, res)
{
	data.forEach(function (item)
	{
		if(item.title == req.params.title)
		{
			item.review.reviews.push(req.body.review);
			item.review.length = item.review.reviews.length;
			res.redirect('/moviedetail?title=' + req.params.title);
		}
	});


}