var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');




var app = express();
var dbPool = mysql.createPool(
{
	host: 'localhost',
	user: 'root',
	password: 'testament',
	database: 'ta_practice_db'
});

app.use(bodyParser.json());



app.get('/api/:path/:param', function(req, res)
{
	respondJson(req, res);
});

app.route('/api/:path')
.get(function(req, res)
{
	respondJson(req, res);
})
.post(function(req, res)
{
	var path = req.params.path.toLowerCase();

	if(path == 'movies')
	{
		addMovie(req, res);
	}
})
.put(function(req, res)
{

});



function respondJson(req, res)
{
	var path = req.params.path.toLowerCase();
	console.log('path : ', path);
	if(path == 'movie')
	{
		getMovieDetail(req, res);
	}
	else if(path == 'movies')
	{
		getMovieList(req, res);
	}
};


function getMovieDetail(req, res)
{
	dbPool.getConnection(function(err, connection)
	{
		if(err)
		{
			console.log('db connection error\n', err);
			return;
		}

		
		var id = mysql.escape(req.params.param);
		var sql1 = 'SELECT * FROM movies WHERE movie_id=' + id + ';';
		var sql2 = 'SELECT review FROM reviews WHERE movie_id=' + id + ';';

		var data;

		connection.beginTransaction(function(err)
		{
			connection.query(sql1, function(err, results)
			{
				if(err)
				{
					console.log('db query error\n', err);
					return;
				}

				data = results[0];
				console.log('results\n', results);
			});

			connection.query(sql2, function(err, results)
			{
				if(err)
				{
					console.log('db query error\n', err);
					return;
				}


				data["reviews"] = results;
				console.log('review\n', results);
				res.status(200).send(JSON.stringify(data));
				connection.release();
			});
		});
	});
};


function getMovieList(req, res)
{
	dbPool.getConnection(function(err, connection)
	{
		if(err)
		{
			console.log('db connection error\n', err);
			return;
		}

		
		var sql = 'SELECT movie_id, title FROM movies;';

		var data;

		connection.query(sql, function(err, results, fields)
		{
			if(err)
			{
				console.log('db query error\n', err);
				conn.rollback();
				return;
			}
			
			data = 
			{
				count : results.length,
				data : results
			};
			
			res.status(200).send(JSON.stringify(data));
			console.log('results\n', data);
			connection.release();
		});
	});
};


function addMovie(req, res)
{
	var title = req.body.title;
	var director = req.body.director;
	var year = req.body.year;


	dbPool.getConnection(function(err, connection)
	{
		if(err)
		{
			console.log('db connection error\n', err);
		}

		var sql = 'INSERT INTO movies (title, director, year) VALUES (?, ?, ?);';

		connection.query(sql, [title, director, year], function(err, results, fields)
		{
			var ret = {};
			if(err)
			{
				ret["result"] = 'error';
				ret["error"] = err;
				res.status(200).send(JSON.stringify(ret));
				console.log('db query error\n', err);
				return;
			}
			ret["result"] = 'ok';
			res.status(200).send(JSON.stringify(ret));
		});
	});
}


app.listen(3000);