(function(wdi) {
	'use strict';
	wdi.use(install);

	function install(wdi, Vue) {
		let componentName = 'home-page';

		wdi.context.component(componentName, getComponent());

		function getComponent(){
			return Vue.component(componentName, {
					replace: false,
					template: [
						'<div>',
							'<menu-bar></menu-bar>',
							'<div class="container">',
								'<router-view></router-view>',
							'</div>',
							'<wdi-footer></wdi-footer>',
						'</div>'
					].join(''),
					props: ['id'],
					data: function() {
						return {'id': this.id};
					},
					compiled: function() {},
					methods: {}
				}
			);
		}
	}
}(wdi));
