(function() {
	function install(Vue) {
		Vue.component('home-page', {
			replace: false,
			template: [
				'<menu-bar></menu-bar>',
				'<wdi-footer></wdi-footer>'
			].join(''),
			props: ['id'],
			data: function() {
				return {'id': this.id};
			},
			compiled: function() {
				this.$data = util.getPaginationData(this.id);
			},
			methods: {
				isCurrent: function(index) {
					return index === this.page;
				}
			}
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
