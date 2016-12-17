var wrap = document.getElementById('wrap');
var lis = wrap.children[0].children[0].children;
var arrow = document.getElementById('arrow');
var spans = arrow.children;
wrap.onmouseover = function() {
	animate(arrow, {opacity: 100});
	clearInterval(timer);
}
wrap.onmouseout = function() {
	animate(arrow, {opacity: 0});
	clearInterval(timer);
	timer = setInterval(change, 3000);
}
var json = [
	{
		width: 600,
    	top: 140,
    	left: 0,
    	opacity: 60,
    	zIndex: 2
	},
	{
		width: 800,
    	top: 300,
    	left: 300,
    	opacity: 100,
    	zIndex: 3
	},
	{
		width: 600,
    	top: 140,
    	left: 800,
    	opacity: 60,
    	zIndex: 2
	},
	{
		width: 400,
    	top: 0,
    	left: 750,
    	opacity: 20,
    	zIndex: 1
	},
	{
		width: 400,
    	top: 0,
    	left: 250,
    	opacity: 20,
    	zIndex: 1
	}
];
change(false);
var throttle = true;
for (var k in spans) {
	spans[k].onclick = function() {
		if (this.className == 'prev') {
			if (throttle) {
				change(true);
				throttle = false;
			}
		} else {
			if (throttle) {
				change(false);
				throttle = false;
			}
		}
	}
}
var timer = null;
timer = setInterval(change, 1000);

function change(flag) {
	if (flag) {
		json.unshift(json.pop());
	} else {
		json.push(json.shift());
	}
	var iNow = 0;
	for(var i = 0, len = lis.length; i < len; i++){
		lis[i].index = i;
		animate(lis[i],json[i],function() { throttle = true; });
	}
}