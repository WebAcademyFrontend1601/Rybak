(function(){

	sessionStorage.removeItem("total"); // clear SessionStorage with page reload
	
	var app = angular.module('store', ['firebase']);


    // config(['$routeProvider', function($routeProvider) {
    //     // Routes will be here
    // }]);


	var i = 0;

	// view goods in store
	app.controller('StoreController', ['$firebaseArray', function($firebaseArray){
			

			// synchronize array
			var goods = new Firebase('https://shop-data.firebaseio.com/shop%20goods');
			this.products = $firebaseArray(goods);

			// busket functionality		
			this.preorderGoods = function(product) {

				i++;
				$(".count").html(i);  // calculate numbers of goods in basket

				product.quantity += 1;
				product.TotalQuantity -= 1;
				
				if (preOrderGoods.indexOf(product) !== -1) {
				} else {
					preOrderGoods.push(product)
				};

				//add total sum to localStorage

				if (sessionStorage.getItem("total")===null) {
					sessionStorage.setItem("total", product.price)
				} else {
					init = sessionStorage.getItem("total");
					sessionStorage.setItem("total", parseFloat(init) + parseFloat(product.price))
				};

				$(".checkout__total").html(sessionStorage.getItem("total"));
			};
		}
	]);


	// view goods in preorder table
	app.controller('preOrder', function(){

		this.myGoods = preOrderGoods;

		this.removeGoods = function(myProduct) {

			var index = preOrderGoods.indexOf(myProduct);
			myProduct.quantity -= 1;
			myProduct.TotalQuantity += 1;

			i--;  // calculate numbers in basket
			$(".count").html(i);

			// delete object from array if quantity equal 0
			if (myProduct.quantity === 0) {
				preOrderGoods.splice(index,1);
			}

			// reduce total sum in localStorage
			init = sessionStorage.getItem("total");
			sessionStorage.setItem("total", parseFloat(init) - parseFloat(myProduct.price));
			
			$(".checkout__total").html(sessionStorage.getItem("total"));

			var nonProtoObj = Object.create(null);
			nonProtoObj.name = myProduct.name;
			console.dir(nonProtoObj)
			console.dir(myProduct)
		};

		// function for submit customers preorder
		this.preOrderForm = function() {

			var CustomerOrder = new Firebase('https://shop-data.firebaseio.com/Customers%20order/' + document.getElementById("order_cellphone").value);
			
			// delete some keys from objects in array
			var filterKeys = function(preOrderGoods, keysToFilter) {
			  return preOrderGoods.map(function(item) {
			    return Object.keys(item).reduce(function(result, key) {
			      if (keysToFilter.indexOf(key) === -1) result[key] = item[key];
			      return result;
			    }, {});
			  });
			};

			yy = JSON.stringify(filterKeys(preOrderGoods, ['$$hashKey', '$id', '$priority', 'TotalQuantity', 'images']), null, '  ');
			//
			
			Order = JSON.parse(yy);

			// add current date to array
			var objToday = new Date();
			weekday = new Array('Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Черверг', 'Пятница', 'Суббота');

			dayOfWeek = weekday[objToday.getDay()];
			dayOfMonth = (objToday.getDate());

			months = new Array('Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря');

			curMonth = months[objToday.getMonth()];
			curYear = objToday.getFullYear();
			curHour = objToday.getHours();
			curMinute = objToday.getMinutes();
			                
			var today = curHour + ":" + curMinute + " " + dayOfWeek + ", " + dayOfMonth + " " + curMonth + ", " + curYear;

			//

			ident = {};
			ident.order_name = document.getElementById("order_name").value;
			ident.order_cellphone = document.getElementById("order_cellphone").value;
			ident.total = sessionStorage.getItem("total");
			ident.time = today;
			Order.splice(0, 0, ident);

			CustomerOrder.push(Order);

			$('#success').css('display', 'block');

			setTimeout(function(){
				document.location.reload()
			}, 500);

			// var COrder = new Firebase('https://shop-data.firebaseio.com/Customers%20order/' + document.getElementById("order_cellphone").value)
		

			// COrder.on('child_added', function(snapshot) {
			// 	console.log(snapshot.val());
			// 	console.log(snapshot.key());
			// });
			
		};
	});
	

	var preOrderGoods = []
})();
