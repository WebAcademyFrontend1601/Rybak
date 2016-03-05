(function(){
	
	var app = angular.module('admin_store', [ ]);


	var goods = []
	

	app.controller('addController', function() {
		this.product = {};

		this.addGoods = function() {
			goods.push(this.product);
			this.product = {};
			console.dir(goods);
		};
	})


	app.controller('StoreController', function() {
		this.products = goods;
		this.removeGoods = function(product) {
			var index = goods.indexOf(product);
			goods.splice(index,1);
		};
	});

	// app.directive('loginRegistration', function() {
	// 	return {
	// 		restrict: 'E',
	// 		templateUrl: 'login-registration.html'
	// 	};
	// });

})();