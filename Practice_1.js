var http = require('http');
var formidable = require('formidable');
var pathUtil = require('path');
var fs = require('fs');


var uploadDir = __dirname + '/upload'; // file upload directory
var imageDir = __dirname + '/img';



var movieList = [];

var server = http.createServer(function(req, res)
{
	console.log('header : ', req.headers);
	console.log('url : ', req.url);
	console.log('method : ', req.method);
	
	if(req.method.toLowerCase() == 'get')
	{
		showList(res);
	}
	else if(req.method.toLowerCase() == 'post')
	{
		addNewMovie(req, res);
	}

}).listen(3000);



// return html body
function showList(res)
{
	res.writeHeader(200, {'Content-Type' : 'text/html'});

	var body = '<html>';
	body += '<head><meta charset="UTF-8"></head>';
	body += '<body>';
	body += '<h3>Favorite Movie</h3>';

	body += '<ul>';
	movieList.forEach(function(item, index)
	{
		body += '<li>';
		if (item.image)
		{
			body += '<div><img src="' + item.image + '" style="height:100pt"></img><h5>' + item.title + '(' + item.director + ',' + item.year + ')</h5></div>';
		}
		body += '</li>';
	});
	body += '</ul>';
	
	
	body += '<form action"." enctype="multipart/form-data" method="post">' +
	'<label>새 영화 입력</label>' + 
	'<ui>' + 
	'<li><div><label>영화 제목 : </label><input type="text" name="title"></div></li>' +
	'<li><div><label>영화 감독 : </label><input type="text" name="director"></div></li>' +
	'<li><div><label>연도 : </label><input type="number" name="year"></div></li>' +
	'<li><div><label>포스터 : </label><input type="file" name="image" value="작품 파일 선택"></div></li>' +
	'</ul>' + 
	'<input type="submit" value="올리기">' +
	'</form>';
	body += '</body></html>';

	res.end(body);
}



function addNewMovie(req, res)
{
	var form = formidable.IncomingForm();
	form.uploadDir = uploadDir;

	// parse the request and separate fields and files
	form.parse(req, function(err, fields, files)
	{
		var title = fields.title;
		var image = files.image;

		console.log(image);

		// make new file name for image
		var date = new Date();
		var newImageName = 'image_' + date.getHours() + date.getMinutes() + date.getSeconds();
		var ext = pathUtil.parse(image.name).ext;

		var newPath = __dirname + '/img/' + newImageName + ext;

		fs.renameSync(image.path, newPath);


		var url = 'img/' + newImageName + ext;

		var info = 
		{
			title : title,
			image : url,
			director : fields.director,
			year : fields.year
		};

		movieList.push(info);

		// applying PRG pattern
		res.statusCode = 302;
		res.setHeader('Location', '.');
		res.end('Success');
	});
}