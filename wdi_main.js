$(()=>{
	$('.sidenav').sidenav();
	$('.tabs').tabs();


	var vueParam = {
		el:'#wdiApp',
		data: {
			titulo: 'Leitor'
		}
	};

	let app = new Vue(vueParam);
});