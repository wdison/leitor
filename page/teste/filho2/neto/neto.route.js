(function(wdi) {
	'use strict';
	wdi.use(install);

	function install(wdi) {
		let componentName = 'neto';
		let component = wdi.context.component(componentName);
		wdi.context.routerHelp.configureStates(getStates());

		function getStates() {
	        return [
	            {
	                'state': 'teste.filho2.neto',
	                'config': {
	                	'name': componentName,
	                    'path': 'neto',
	                    'component': component,
	                    /*ncyBreadcrumb: {
	                        label: 'Consultas'
	                    },
	                    data:{
	                        tipo:'sub-modulo',
	                        titulo:'Notificação Individual',
	                        descricao:'Consulta de Notificação Individual',
	                    }*/
	                }
	            }
	        ];
	    }
	}
}(wdi));