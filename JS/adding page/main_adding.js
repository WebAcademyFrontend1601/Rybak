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


			// recieve data from base and modify it
			GoodsData.on('value', function(snapshot) {
				var base = snapshot.val();
				Array.prototype.push.apply(base, dataGoods);

				console.log(base);

				GoodsData.set(base);

			});
		};
	});

	// view goods in store
	app.controller('StoreCtrl', ['$firebaseArray', function($firebaseArray){
			
			// synchronize array
			var goods = new Firebase('https://shop-data.firebaseio.com/shop%20goods');
			this.products = $firebaseArray(goods);

			this.removeGoods = function(product) {
			}
		}
	]);
})();