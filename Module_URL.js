var url = require('url');

var urlStr = 'http://www.google.com/search?q=iPhone&format=json'
var parsed = url.parse(urlStr);
console.log(parsed);

var parsedQuery = url.parse(urlStr, true);
console.log(parsedQuery.query);