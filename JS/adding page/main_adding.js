(function(){
	
	var app = angular.module('admin_store', ['firebase']);


	var goods = []
	

	app.controller('addController', function() {
		this.product = {};

		// adding img func


		function readFile() {
			if (this.files && this.files[0]) {
				var FR= new FileReader();
				
				FR.onload = function(e) {
					base64 = e.target.result;
				};

				FR.readAsDataURL( this.files[0] );
			}
		}

		document.getElementById("chose_file_input").addEventListener("change", readFile, false);
		// ==============================================

		this.addGoods = function() {
			this.product.quantity = 0;
			this.product.images = base64;
			goods.push(this.product);
			this.product = {};
		};
	})


	app.controller('StoreController', function() {
		this.products = goods;
		this.removeGoods = function(product) {
			var index = goods.indexOf(product);
			goods.splice(index,1);
		};

		this.submitForm = function() {
			console.dir(goods);

			var GoodsData = new Firebase('https://shop-data.firebaseio.com/shop%20goods');
			
			// delete some keys from objects in array
			var filterKeys = function(goods, keysToFilter) {
			  return goods.map(function(item) {
			    return Object.keys(item).reduce(function(result, key) {
			      if (keysToFilter.indexOf(key) === -1) result[key] = item[key];
			      return result;
			    }, {});
			  });
			};

			yy = JSON.stringify(filterKeys(goods, ['$$hashKey']), null, '  ');
			//
			
			dataGoods = JSON.parse(yy);
			console.log(dataGoods);
			GoodsData.push(dataGoods);


				GoodsData.on('value', function(snapshot) {
					var base = snapshot.val();


					console.log(snapshot.val());
					// console.log(snapshot.child('shop goods'));
					// console.log(snapshot.key());
				});
		};
	});

	// view goods in store
	app.controller('StoreCtrl', ['$firebaseArray', function($firebaseArray){
			
			// synchronize array
			var goods = new Firebase('https://shop-data.firebaseio.com/shop%20goods');
			this.products = $firebaseArray(goods);

			this.removeGoods = function(product) {
				// console.log(product.$id);
				// console.log(product);

				// goods.remove(snapshot.key());
				// var index = products.indexOf(product);
				goods.on('value', function(snapshot) {
					console.log(product.$id);
					var base = snapshot.val();
					delete base[product.$id];
					console.log(base);
				});


				// goods.on('child_added', function(snapshot) {
				// 	// console.log(snapshot.key());
				// 	console.log(snapshot.child(0));
				// 	// console.log(snapshot.key());
				// });

				// x = $firebaseArray(goods.child('shop goods').child());
				// console.log(x);
			}
		}
	]);

	// view orders in store
	// app.controller('OrdersCtrl', ['$firebaseArray', function($firebaseArray){
			
	// 		// synchronize array
	// 		var orders_ = new Firebase('https://shop-data.firebaseio.com/Customers%20order/-KCfptOmGC1-uGkQZ3Ef');
	// 		this.orders = $firebaseArray(orders_);
	// 	}
	// ]);




	// app.directive('loginRegistration', function() {
	// 	return {
	// 		restrict: 'E',
	// 		templateUrl: 'login-registration.html'
	// 	};
	// });

})();