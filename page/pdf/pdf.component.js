(function(wdi) {
	'use strict';
	wdi.use(install);

	function install(wdi, Vue) {
		let componentName = 'pdf';

		wdi.context.component(componentName, getComponent());

		function getComponent(){
			let component = Vue.component(componentName, function(resolve, reject){
					let config = {
						replace: false,
						templateUrl: [
							'<div>',
								'<h1>PDF com erro</h1>',
							'</div>'
						].join(''),
						props: ['id'],
						data: function() {
							return {};
						},
						compiled: function() {},
						methods: {}
					}
					axios.get('page/pdf/pdf.tpl.html').then(function(r){
						console.log(r);
						config.template = r.data;

						resolve(config);
					}, function(err){
						resolve(config);
						console.log(err);
					});
				}
			);
			return component;
		}
	}
}(wdi));
