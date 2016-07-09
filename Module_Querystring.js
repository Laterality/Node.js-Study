var querystring = require('querystring');

var str = 'q=iPhone&format=json';
var parsed = querystring.parse(str);

console.log(parsed);