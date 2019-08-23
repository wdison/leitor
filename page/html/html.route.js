(function(wdi) {
	'use strict';
	wdi.use(install);

	function install(wdi) {
		let componentName = 'html';
		let component = wdi.context.component(componentName);
		wdi.context.routerHelp.configureStates(getStates());

		function getStates() {
	        return [
	            {
	                'state': componentName,
	                'config': {
	                	'name': componentName,
	                    'path': '/html',
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