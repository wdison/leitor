(function(wdi) {
	'use strict';
	wdi.use(install);

	function install(wdi, Vue) {
		let componentName = 'html';
		let componentConfig = {
			replace: false,
			templateUrl: 'page/html/html.tpl.html',
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
