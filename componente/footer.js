(function() {
	function install(Vue) {
		Vue.component('wdi-footer', {
			replace: false,
			template: [
				'<footer class="page-footer fixed-down light-blue darken-3">',
					'<div class="footer-copyright">',
						'<div class="container">',
							'© 2019 Copyright Wdison',
							'<a class="grey-text text-lighten-4 right" href="#!">Sobre</a>',
						'</div>',
					'</div>',
				'</footer>'
			].join(''),
			props: ['id'],
			data: function() {
				return {
					'id': this.id,
					titulo: 'Leitor'
				};
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
