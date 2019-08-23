(function(wdi) {
	'use strict';
	wdi.use(install);

	function install(wdi, Vue) {
		let componentName = 'pdf';

		wdi.context.component(componentName, getComponent());

		function getComponent(){
			return Vue.component(componentName, {
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
				}
			);
		}
	}
}(wdi));
