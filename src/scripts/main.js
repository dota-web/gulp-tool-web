var test1 = require('./test1');
var test2 = require('./test2');
var jQuery = require('jquery');
var type = require('./type');

//test1();
//test2();
//test1.add();
(function ($) {
	$(function () {
		$('.body').html('hello world !');
		//alert('ddd');
		var nowType = new type({
			text: 'hahah '
		})
		nowType.init();
	})
})(jQuery)