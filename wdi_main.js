(function(wdi) {
	'use strict';
	wdi.use(install);

	function install(wdi, Vue) {
		document.addEventListener('DOMContentLoaded', function() {
			let _routes = wdi.context.routerHelp.getRoutes();

			var context = {
				routes: _routes
			};
			var router = new VueRouter(context);

			var vueParam = {
				el:'#wdiApp',
				router,
				data: {
					titulo: 'Leitor'
				}
			};

			let app = new Vue(vueParam);
		});
	}
}(wdi));


