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

				/*para configurar filhos*/
				/*basta colocar '.' para separar.*/
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
							let statesName = state.state.split('.');
							if(statesName.length > 1) {
								addChild(state, statesName, _states, 0);
							} else {
								state._name = state.state;
								_states.push(state);
								_routes.push(state.config);
							}
						});
					}

					function addChild(state, statesName, _states, indexName){
						//TODO continuar daqui
						let stateName = statesName[indexName];
						indexName++;
						_states.forEach(function(_state) {
							if(_state._name == stateName){
								if((indexName+1) == statesName.length) {
									state._name = statesName[indexName];
									_state.children = _state.children||[];
									_state.children.push(state);
									_state.config.children = _state.config.children||[];
									_state.config.children.push(state.config);
								} else {
									addChild(state, statesName, _state.children, indexName);
								}
							}
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
										axios.get(componentConfig.templateUrl).then(function(r){
											componentConfig.template = r.data;
											resolve(componentConfig);
										}, function(err) {
											reject("Error in template '"+componentConfig.templateUrl+"' with msg '"+err.message+"'");
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
