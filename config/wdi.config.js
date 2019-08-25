(
	function (global, factory) {
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.wdi = global.wdi || factory(global.Vue));
	}(this, 
		(
			function (Vue) {
				'use strict';
				let _self = {};
				_self.vue = Vue;
				Vue.wdi = _self;

				_self.context = {
					'routerHelp': routerHelper(),
					'component': createComponentProvider()
				};

				_self.use = function(callbackConfiguration){
					if(callbackConfiguration) {
						callbackConfiguration(_self, Vue);
					}
				};

				function routerHelper() {
					var hasOtherwise = false;
					var _states = [];
					var _routes = [];
					var _router = undefined;

					var service = {
						'configureStates': configureStates,
						'configureOtherwise': configureOtherwise,
						'getStates': getStates,
						'getRoutes': getRoutes,
						'getRouter': getRouter
					};

					return service;

					//Configura os states do app
					function configureStates(states) {
						states.forEach(function(state) {
							_states.push(state);
							_routes.push(state.config);
						});
					}

					//Configura os states do app
					function configureOtherwise(otherwiseState) {
						//TODO criar otherwise para vue
		/*				if (otherwisePath && !hasOtherwise) {
							hasOtherwise = true;
							$urlRouterProvider.otherwise(otherwisePath);
						}*/
					}

					function getStates() { return Object.assign([], _states)}
					function getRoutes() { return Object.assign([], _routes)}
					
					function getRouter() { 
						if(!_router){
							let _routes = service.getRoutes();

							var context = {
								routes: _routes
							};
							_router = new VueRouter(context);
						}
						return _router;
					}
				}

				function createComponentProvider(){
					let _components = {};

					function componentProvider(componentName, component) {
						if(!componentName) throw 'component name is required';

						let componentResult = _components[componentName];

						if(!component){
							if(!componentResult) throw 'component does not exist';
							return componentResult;
						} else {
							if(componentResult) throw 'component '+componentName+' alredy exists';

							if(component.templateUrl){
								let componentConfig = component;
								component = Vue.component(componentName, function(resolve, reject) {
										axios.get(component.templateUrl).then(function(r){
											console.log(r);
											componentConfig.template = r.data;
											resolve(componentConfig);
										}, function(err){
											console.log(err);
											resolve(componentConfig);
										});
									}
								);
							}
							_components[componentName] = component;
						}
					}
					return componentProvider;
				}

				return _self;
			}
		)
	)
);
