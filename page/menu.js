(function(wdi) {
	'use strict';
	wdi.use(install);

	function install(wdi, Vue) {
		let componentName = 'menu-bar';

		wdi.context.component(componentName, getComponent());

		function getComponent(){
			return Vue.component(componentName, {
					replace: false,
					template: [
						'<div class="navbar-fixed">',
							'<nav class="nav-extends light-blue darken-3">',
								'<div class="nav-wrapper container">',
									'<div class="row">',
										'<div class="col s6">',
											'<a href="#" class="brand-logo left"><i class="fas fa-book-reader"></i>{{titulo}}</a>',
										'</div>',
										'<div class="col s6">',
											'<div class="row">',
												'<div class="col s7">',
													'<a href="#" data-target="mobile-demo" class="sidenav-trigger right"><i class="material-icons">menu</i></a>',
													'<div class="right hide-on-med-and-down">',
														'<ul>',
															'<li><router-link class="active" to="/pdf">PDF</router-link></li>',
															'<li><router-link class="active" to="/html">Html</router-link></li>',
															'<li><a href="#test3">Doc(x)</a></li>',
															'<li>',
																'<a class="dropdown-trigger" href="#test4" data-target="dropdown50" data-beloworigin="true">',
																	'<i class="ace-icon fa fa-caret-down right"></i>',
																	'Options',
																'</a>',
																'<ul id="dropdown50" class="dropdown-content">',
																	'<li><a href="#!">one</a></li>',
																	'<li><a href="#!">two</a></li>',
																	'<li class="divider" tabindex="-1"></li>',
																	'<li><a href="#!">three</a></li>',
																	'<li><a href="#!"><i class="fa fa-caret-right right"></i>four</a></li>',
																	'<li><a href="#!"><i class="fa fa-caret-right right"></i>five</a></li>',
																'</ul>',
															'</li>',
														'</ul>',
													'</div>',
												'</div>',
												'<div class="col s5 user-view">',
													'<a href="index.html#" class="btn-floating btn-large waves-effect waves-light"><i class="far fa-smile-beam right"></i></a>',
													'<a class="dropdown-trigger" href="#!" data-target="dropdown2">',
														'<span class="user-info">',
															'<small>Bem vindo,<br/>JOSE WDISON DE SOUZA 2</small>',
														'</span>',
														'<i class="ace-icon fa fa-caret-down right"></i>',
													'</a>',
													'<ul id="dropdown2" class="dropdown-content">',
														'<li><a href="#!">one</a></li>',
														'<li><a href="#!">two</a></li>',
														'<li class="divider"></li>',
														'<li><a href="#!">three</a></li>',
													'</ul>',
												'</div>',
											'</div>',
										'</div>',
									'</div>',
								'</div>',

								'<div class="nav-content container">',
									'<ul>',
										'<li class="btn"><router-link class="active" to="/pdf">PDF</router-link></li>',
										'<li class="btn"><router-link class="active" to="/html">Html</router-link></li>',
										'<li class="btn"><a href="#test3">Doc(x)</a></li>',
										'<li class="btn">',
											'<a class="dropdown-trigger" href="#test4" data-target="dropdown50" data-beloworigin="true">',
												'<i class="ace-icon fa fa-caret-down right"></i>',
												'Options',
											'</a>',
											'<ul id="dropdown50" class="dropdown-content">',
												'<li class="btn"><a class="black-text" href="#!">one</a></li>',
												'<li class="btn"><a class="black-text" href="#!">two</a></li>',
												'<li class="divider" tabindex="-1"></li>',
												'<li class="btn"><a class="black-text" href="#!">three</a></li>',
												'<li class="btn"><a class="black-text" href="#!">four<i class="fa fa-caret-right right"></i></a></li>',
												'<li class="btn"><a class="black-text" href="#!">five<i class="fa fa-caret-right right"></i></a></li>',
											'</ul>',
										'</li>',
									'</ul>',
								'</div>',
								'<div id="dropdown-menu" ref="dropdown-menu"></div>',
							'</nav>',
						'</div>',
					].join(''),
					props: ['id'],
					data: function() {
						return {
							'id': this.id,
							titulo: 'Leitor'
						};
					},
					compiled: function() {},
					methods: {
						_init(){
							var elems = document.querySelectorAll('.sidenav');
							var sidenav = M.Sidenav.init(elems);
							elems = document.querySelectorAll('.dropdown-trigger');
							var dropdownMenu = this.$refs['dropdown-menu'];
		    				var dropdowns = M.Dropdown.init(elems, {
								coverTrigger: false,
								constrainWidth: false,
								container: dropdownMenu
							});
						}
					},
					mounted: function() {
						this._init();
					}
				}
			);
		}
	}
}(wdi));
