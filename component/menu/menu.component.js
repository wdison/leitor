(function(wdi) {
	'use strict';
	wdi.use(install);

	function install(wdi, Vue) {
		let componentName = 'menu-bar';
		let componentConfig = {
			replace: false,
			templateUrl: 'component/menu/menu.tpl.html',
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

		wdi.context.component(componentName, componentConfig);
	}
}(wdi));
