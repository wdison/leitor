(function(wdi) {
	'use strict';
	wdi.use(install);

	function install(wdi, Vue) {
		document.addEventListener('DOMContentLoaded', function() {
			var router = wdi.context.routerHelp.getRouter();

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
