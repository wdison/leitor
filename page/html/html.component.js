(function(wdi) {
	wdi.use(install);

	function install(wdi, Vue) {
		let componentName = 'html';

		wdi.context.component(componentName, getComponent());

		function getComponent(){
			return Vue.component(componentName, {
					replace: false,
					template: [
						'<div>',
							'<h1>HTML</h1>',
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
