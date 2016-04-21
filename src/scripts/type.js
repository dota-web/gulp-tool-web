function types (config) {
	this.text = config.text
}

types.prototype = {
	init: function () {
		var that = this;
		document.querySelectorAll('header')[0].innerHTML = that.text;
	}
}

module.exports = types