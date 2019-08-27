(function(wdi) {
	'use strict';
	wdi.use(install);

	function install(wdi, Vue) {
		let componentName = 'neto';
		let componentConfig = {
			replace: false,
			templateUrl: 'page/teste/filho2/neto/neto.tpl.html',
			props: ['id'],
			data: function() {
				return {};
			},
			compiled: function() {},
			methods: {}
		}

		wdi.context.component(componentName, componentConfig);
	}
}(wdi));
