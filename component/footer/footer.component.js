(function(wdi) {
	'use strict';
	wdi.use(install);

	function install(wdi, Vue) {
		let componentName = 'wdi-footer';
		let componentConfig = {
			replace: false,
			templateUrl: 'component/footer/footer.tpl.html',
			props: ['id'],
			data: function() {
				return {
					'id': this.id,
					titulo: 'Leitor'
				};
			},
			compiled: function() {},
			methods: {}
		}

		wdi.context.component(componentName, componentConfig);
	}
}(wdi));
