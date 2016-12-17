var js_slider = document.getElementById('js_slider');
var imgs = js_slider.children[0].children[0].children;
var slider_ctrl = js_slider.children[1];
var slider_ctrl_next = slider_ctrl.children[slider_ctrl.children.length - 1];
var timer = null;
timer = setInterval(autoPlay, 3000);
js_slider.onmouseover = function() {
	clearInterval(timer);
}
js_slider.onmouseout = function() {
	clearInterval(timer);
	timer = setInterval(autoPlay, 3000);
}
for(var i = 0, imgsLen = imgs.length; i < imgsLen; i++){
	var span = document.createElement('span');
	slider_ctrl.insertBefore(span, slider_ctrl_next);
	span.innerHTML = i + 1;
	span.className = 'slider-ctrl-con';
}
var spans = slider_ctrl.children;
spans[1].setAttribute('class', 'slider-ctrl-con current');
var imgWidth = js_slider.clientWidth;
for(var i = 1; i < imgsLen; i++){
		imgs[i].style.left = imgWidth + 'px';
}
var iNow = 0;
for (var k in spans) {
	spans[k].onclick = function() {
		if (this.className == 'slider-ctrl-prev')
		{
			animate(imgs[iNow], {left: imgWidth});
			--iNow < 0 ? iNow = imgsLen - 1 : iNow;
			imgs[iNow].style.left = -imgWidth + 'px';
			animate(imgs[iNow], {left: 0});
			setSquare();
		}
		else if (this.className == 'slider-ctrl-next')
		{
			autoPlay();
		}
		else
		{
			var that = this.innerHTML - 1;
			if (that > iNow)
			{
				animate(imgs[iNow], {left: -imgWidth});
				imgs[that].style.left = imgWidth + 'px';
			}
			else if (that < iNow)
			{
				animate(imgs[iNow], {left: imgWidth});
				imgs[that].style.left = -imgWidth + 'px';
			}
			iNow = that;
			animate(imgs[iNow], {left: 0});
			setSquare();
		}
	}
}

function autoPlay() {
	animate(imgs[iNow], {left: -imgWidth});
	++iNow >= imgsLen ? iNow = 0 : iNow;
	imgs[iNow].style.left = imgWidth + 'px';
	animate(imgs[iNow], {left: 0});
	setSquare();
}
function setSquare() {
	for(var i = 1, spansLen = spans.length - 1; i < spansLen; i++){
		spans[i].className = 'slider-ctrl-con';
	}
	spans[iNow + 1].className = 'slider-ctrl-con current';
}

