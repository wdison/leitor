(function(wdi) {
	'use strict';
	wdi.use(install);

	function install(wdi, Vue) {
		let componentName = 'pdf';
		let componentConfig = {
			replace: false,
			templateUrl: 'page/pdf/pdf.tpl.html',
			props: ['id'],
			data: function() {
				return {};
			},
			beforeMount: function() {
				console.log('beforeMount');
			},
			mounted: function() {
				console.log('mounted');
				var elems = document.querySelectorAll('select');
				var options = document.querySelectorAll('option');
				var instances = M.FormSelect.init(elems, options);
			},
			computed: function() {
				console.log('computed');
			},
			beforeCreate: function() {
				console.log('beforeCreate');
			},
			created: function() {
				console.log('created');
			},
			beforeUpdate: function() {
				console.log('beforeUpdate');
			},
			updated: function() {
				console.log('updated');
			},
			beforeDestroy: function() {
				console.log('beforeDestroy');
				wdi.audio.stop();
			},
			destroyed: function() {
				console.log('destroyed');
			},
			methods: {}
		}

		wdi.context.component(componentName, componentConfig);
	}
}(wdi));
