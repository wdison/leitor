(function() {
	function install(Vue) {
		Vue.component('pdf', {
			replace: false,
			template: [
				'<nav>',
					'<ul class="pagination">',
						'<li>',
							'<a href="#" aria-label="Previous" v-on="click: prev">',
								'<span aria-hidden="true">&laquo;</span>',
							'</a>',
						'</li>',
			        	'<li v-repeat="pageCount" v-class="active: isCurrent($index)"><a href="#" v-on="click: this.page = $index">{{$index+1}}</a></li>',
			        	'<li>',
			          		'<a href="#" aria-label="Next" v-on="click: next">',
								'<span aria-hidden="true">&raquo;</span>',
							'</a>',
						'</li>',
			      	'</ul>',
				'</nav>'
			].join(''),
			props: ['id'],
			data: function() {
				return {};
			},
			compiled: function() {},
			methods: {}
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
