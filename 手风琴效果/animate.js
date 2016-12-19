function animate(obj, json, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var flag = true;
		for (var k in json) {
			var current = 0;
			if (k == 'opacity') {
				current = getStyle(obj, k) * 100 || 0;
			} else {
				current = parseInt(getStyle(obj, k));
			}
			var step = (json[k] - current) / 10;
			step = step > 0 ? Math.ceil(step) : Math.floor(step);
			if (k == 'opacity') {
				'opacity' in obj.style ? obj.style.opacity = (current + step) / 100 : obj.style.filter = 'alpha(opacity = '+ (current + step) * 10 +')';
			} else if(k == 'zIndex') {
				obj.style.zIndex = json[k];
			} else {
				obj.style[k] = current + step + 'px';
			}
			if (current != json[k]) {
				flag = false;
			}
		}
		if (flag) {
			clearInterval(obj.timer);
			if (fn) {
				fn();
			}
		}
	}, 30)
}

function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return window.getComputedStyle(obj, null)[attr];
	}
}