(function(){

	sessionStorage.removeItem("total"); // clear SessionStorage with page reload
	
	var app = angular.module('store', [ ]);

	var i = 0;

	// view goods in store
	app.controller('StoreController', function(){
		this.products = goods;

		// choose goods in store
		this.preorderGoods = function(product) {

			i++;
			$(".count").html(i);  // calculate numbers of goods in basket

			product.quantity += 1;
			product.TotalQuantity -= 1;
			
			if (preOrderGoods.indexOf(product) !== -1) {
			} else {
				preOrderGoods.push(product)
			};

			// add total sum to localStorage

			if (sessionStorage.getItem("total")===null) {
				sessionStorage.setItem("total", product.price)
			} else {
				init = sessionStorage.getItem("total");
				sessionStorage.setItem("total", parseFloat(init) + parseFloat(product.price))
			};

			$(".checkout__total").html(sessionStorage.getItem("total"));
		};
	})


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
		};

		// function for submit customers preorder
		this.preOrderForm = function() {
			
			console.log(preOrderGoods);

			// $(".main_elements_block").fadeOut();
		};
	});
	

	var preOrderGoods = []


	var goods = [
		{
			"name": 'Ascend G7',
			"TM": 'Huawei',
			"price": 5636,
			"quantity": 0,
			"TotalQuantity": 17,
			"description": 'смартфон',
			"images": 'images/Huawei Ascend G7.jpg'
		},
		{
			"name": 'iPhone 5s',
			"TM": 'Apple',
			"price": 8799,
			"quantity": 0,
			"TotalQuantity": 31,
			"description": 'смартфон',
			"images": 'images/Apple iPhone-5s.jpg'
		},
		{
			"name": 'Galaxy S5',
			"TM": 'Samsung',
			"price": 7900,
			"quantity": 0,
			"TotalQuantity": 8,
			"description": 'смартфон',
			"images": 'images/Samsung Galaxy-S5-White.png'
		},
		{
			"name": 'G7',
			"TM": 'Huawei',
			"price": 6129,
			"quantity": 0,
			"TotalQuantity": 13,
			"description": 'смартфон',
			"images": 'images/Huawei G7.jpg'
		},
		{
			"name": 'iPhone 6',
			"TM": 'Apple',
			"price": 17999,
			"quantity": 0,
			"TotalQuantity": 10,
			"description": 'смартфон',
			"images": 'images/iPhone 6.png'
		},
		{
			"name": 'Galaxy S6',
			"TM": 'Samsung',
			"price": 16999,
			"quantity": 0,
			"TotalQuantity": 10,
			"description": 'смартфон',
			"images": 'images/samsung-galaxy-gallery-img-5-400-170315.jpeg'
		},
		{
			"name": 'Ascend Mate 7',
			"TM": 'Huawei',
			"price": 9999,
			"quantity": 0,
			"TotalQuantity": 6,
			"description": 'смартфон',
			"images": 'images/Huawei Mate 7.jpg'
		},
		{
			"name": 'Apple watch',
			"TM": 'Apple',
			"price": 10506,
			"quantity": 0,
			"TotalQuantity": 10,
			"description": 'часы',
			"images": 'images/Apple watch.jpe'
		},
		{
			"name": 'Ideaphone 2',
			"TM": 'Lenovo',
			"price": 2495,
			"quantity": 0,
			"TotalQuantity": 10,
			"description": 'смартфон',
			"images": 'images/lenovo-smartphones-ideaphone-brand-2.png'
		},
		{
			"name": 'MateBook 5',
			"TM": 'Huawei',
			"price": 6298,
			"quantity": 0,
			"TotalQuantity": 34,
			"description": 'ноутбук',
			"images": 'images/Huawei MateBook 5.jpg'
		},
		{
			"name": 'iPad Air2',
			"TM": 'Apple',
			"price": 15599,
			"quantity": 0,
			"TotalQuantity": 10,
			"description": 'планшет',
			"images": 'images/Apple iPad Air2.jpe'
		},
		{
			"name": 'IdeaPad',
			"TM": 'Lenovo',
			"price": 7339,
			"quantity": 0,
			"TotalQuantity": 6,
			"description": 'ноутбук',
			"images": 'images/lenovo_80qq004nua_images_1233581369.jpg'
		},
		{
			"name": 'P8',
			"TM": 'Huawei',
			"price": 8736,
			"quantity": 0,
			"TotalQuantity": 10,
			"description": 'смартфон',
			"images": 'images/Huawei P8.png'
		},
		{
			"name": 'MacBook Air',
			"TM": 'Apple',
			"price": 23374,
			"quantity": 0,
			"TotalQuantity": 10,
			"description": 'ноутбук',
			"images": 'images/Apple MacBook Air.png'
		},
		{
			"name": 'ThinkPad',
			"TM": 'Lenovo',
			"price": 8799,
			"quantity": 0,
			"TotalQuantity": 10,
			"description": 'ноутбук',
			"images": 'images/thinkpadFull.png'
		},
		{
			"name": 'P8max',
			"TM": 'Huawei',
			"price": 19999,
			"quantity": 0,
			"TotalQuantity": 8,
			"description": 'smartphone',
			"images": 'images/Huawei P8max.jpg'
		},
		{
			"name": 'iPod Touch 5G',
			"TM": 'Apple',
			"price": 5555,
			"quantity": 0,
			"TotalQuantity": 10,
			"description": 'плеер',
			"images": 'images/Apple iPod Touch 5G 32Gb Black Slate.jpeg'
		},
		{
			"name": 'Lenovo P780',
			"TM": 'Lenovo',
			"price": 2728,
			"quantity": 0,
			"TotalQuantity": 10,
			"description": 'смартфон',
			"images": 'images/20140902165715_790321.jpg'
		}
	]

})();
