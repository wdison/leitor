(function() {
	function install(Vue) {
		Vue.component('menu-bar', {
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
										'<div class="col s10">',
											'<a href="#" data-target="mobile-demo" class="sidenav-trigger right"><i class="material-icons">menu</i></a>',
											'<div class="right hide-on-med-and-down">',
												'<ul class="tabs tabs-transparent">',
													'<li class="tab"><a class="active" href="#test1">PDF</a></li>',
													'<li class="tab"><a href="#test2">Html</a></li>',
													'<li class="tab"><a href="#test3">Doc(x)</a></li>',
													'<li class="tab"><a href="#test4">Options</a></li>',
												'</ul>',
											'</div>',
										'</div>',
										'<div class="col s2">',
											'<a href="index.html#" class="btn-floating btn-large waves-effect waves-light"><i class="far fa-smile-beam right"></i></a>',
											'<a class="dropdown-trigger" href="#!" data-target="dropdown1">',
												'<span class="user-info ng-binding">',
													'<small>Bem vindo,</small> JOSE WDISON DE SOUZA 2',
												'</span>',
												'<i class="ace-icon fa fa-caret-down right"></i>',
											'</a>',
											'<ul id="dropdown1" class="dropdown-content">',
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
			compiled: function() {
				this.$data = util.getPaginationData(this.id);
			},
			methods: {
				isCurrent: function(index) {
					return index === this.page;
				}
			}
		});
	}

	if (typeof exports == "object") {
		module.exports = install;
	} else if (typeof define == "function" && define.amd) {
		define([], function(){ return install });
	} else if (window.Vue) {
		Vue.use(install);
	}

})();
