(function(wdi) {
	'use strict';
	wdi.use(install);

	function install(wdi, Vue) {
		let componentName = 'home-page';
		let componentConfig = {
			replace: false,
			templateUrl: 'component/home/home.tpl.html',
			props: ['id'],
			data: function() {
				return {'id': this.id};
			},
			compiled: function() {},
			methods: {}
		}

		wdi.context.component(componentName, componentConfig);
	}
}(wdi));
