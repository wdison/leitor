(function() {
	'use strict';
	function install(Vue) {
		Vue.component('pdf', {
			replace: false,
			template: [
				'<div>',
					'<h1>PDF</h1>',
				'</div>'
			].join(''),
			props: ['id'],
			data: function() {
				return {};
			},
			compiled: function() {},
			methods: {}
		});
	}

	if (typeof exports == "object") {
		module.exports = install;
	} else if (typeof define == "function" && define.amd) {
		define([], function(){ return install });
	} else if (window.Vue) {
		Vue.use(install);
	}
})();
