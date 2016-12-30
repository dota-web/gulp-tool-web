var test1 = require('./components/test1');
var test2 = require('./components/test2');
const $ = require('jquery');
const type = require('./components/type');
	
$(function () {
	$('.body').html('hello world !');
	var nowType = new type({
		text: 'hello'
	})
	nowType.init();
})