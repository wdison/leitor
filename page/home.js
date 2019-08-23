(function() {
	function install(Vue) {
		Vue.component('home-page', {
			replace: false,
			template: [
				'<div>',
					'<menu-bar></menu-bar>',
					'<router-view></router-view>',
					'<wdi-footer></wdi-footer>',
				'</div>'
			].join(''),
			props: ['id'],
			data: function() {
				return {'id': this.id};
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
