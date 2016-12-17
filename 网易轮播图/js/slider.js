function $(id) {
	return document.getElementById(id);
}

function autoPlay() {
	animate(slider_main_imgs[key], {left: -slider_main_imgWidth});
	key = ++key >= length1 ? 0 : key;
	slider_main_imgs[key].style.left = slider_main_imgWidth + 'px';
	animate(slider_main_imgs[key], {left: 0});
	setSquare();
}

function setSquare() {
	for(var i = 1; i <= length1; i++){
		spans[i].className = 'slider-ctrl-con';
	}
	spans[key + 1].className = 'slider-ctrl-con current';
}

var js_slider = $('js_slider');
var slider_main_imgs = js_slider.children[0].children[0].children;
var slider_ctrl = js_slider.children[1];
for(var i = 0, length1 = slider_main_imgs.length; i < length1; i++){
	var span = document.createElement('span');
	span.innerHTML = i + 1;
	span.className = 'slider-ctrl-con';
	slider_ctrl.insertBefore(span, slider_ctrl.children[slider_ctrl.children.length - 1]);
}
var spans = slider_ctrl.children;
spans[1].setAttribute('class', 'slider-ctrl-con current');
var slider_main_imgWidth = js_slider.clientWidth;
for(var i = 1; i < length1; i++){
	slider_main_imgs[i].style.left = slider_main_imgWidth + 'px';
}
var key = 0;
for (var k in spans) {
	spans[k].onclick = function() {
		if (this.className == 'slider-ctrl-prev') {
			animate(slider_main_imgs[key], {left: slider_main_imgWidth});
			key = --key < 0 ? length1 - 1 : key;
			slider_main_imgs[key].style.left = -slider_main_imgWidth + 'px';
			animate(slider_main_imgs[key], {left: 0});
			setSquare();
		} else if (this.className == 'slider-ctrl-next') {
			autoPlay();
		} else {
			var that = this.innerHTML - 1;
			if (that > key) {
				animate(slider_main_imgs[key], {left: -slider_main_imgWidth});
				slider_main_imgs[that].style.left = slider_main_imgWidth + 'px';
			} else if (that < key) {
				animate(slider_main_imgs[key], {left: slider_main_imgWidth});
				slider_main_imgs[that].style.left = -slider_main_imgWidth + 'px';
			}
			key = that;
			animate(slider_main_imgs[key], {left: 0});
			setSquare();
		}
	}
}

var timer = null;
timer = setInterval(autoPlay, 3000);

js_slider.onmouseover = function() {
	clearInterval(timer);
}

js_slider.onmouseout = function() {
	clearInterval(timer);
	timer = setInterval(autoPlay, 3000);
}