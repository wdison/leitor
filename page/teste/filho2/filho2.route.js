(function(wdi) {
	'use strict';
	wdi.use(install);

	function install(wdi) {
		let componentName = 'filho2';
		let component = wdi.context.component(componentName);
		wdi.context.routerHelp.configureStates(getStates());

		function getStates() {
	        return [
	            {
	                'state': 'teste.filho2',
	                'config': {
	                	'name': componentName,
	                    'path': 'filho2',
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