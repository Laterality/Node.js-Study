var util = require('util');

function Parent()
{
	
}

Parent.prototype.printMessage = function()
{
	console.log('Hi!');
}


function Child()
{
	
}

util.inherits(Child, Parent);

var c = new Child();
c.printMessage();