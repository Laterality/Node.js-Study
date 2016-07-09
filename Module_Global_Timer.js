function welcome(name)
{
	console.log("Welcome, " + name + "!");
}
name = "Guest 1";
setTimeout(function(arg)
{
	welcome(arg);
}, 3*1000, name);

setInterval(function(arg)
{
	welcome(arg);
}, 3*1000, name);