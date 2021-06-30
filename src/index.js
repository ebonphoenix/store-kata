var basketPricer = function(){
	var items = [];
	var stock = {
		"apple": {
			unit: "single",
			price: .10
		},
		"milk": {
			unit: "bottle",
			price: 1.30
		},
		"bread": {
			unit: "loaf",
			price: .80
		},
		"soup": {
			unit: "tin",
			price: .65
		}
	}
	
	var parseBasket = function(basketContents){
		var basketContentsRegEx = /^Price a basket containing: (.*), bought .*$/;
		parseContents(basketContents.match(basketContentsRegEx)[1]);
	}
	
	var parseContents = function(basketContents){
		if (!basketContents) return;
		
		var basketItemGroupRegEx = /^(.*) and (.*)$/;
		var matches = basketContents.match(basketItemGroupRegEx);
		
		//alert( "basketContents = " + basketContents + " | matches = " + matches);
		
		if(matches) {
			parseBasketItem(matches[1]);
			parseBasketItem(matches[2]);
		}
		else {
			parseBasketItem(basketContents);
		}
		
	}
	
	var parseBasketItem = function(basketItem){
		var basketItemRegEx = /^(\d)?.* (\w+)$/;
		var matches = basketItem.match(basketItemRegEx);
		
		if(!matches) return;
		
		var itemCount = matches[1]? matches[1] : 1, itemName = matches[2];
		
		var item = getItemBySingularName(itemName);
		
		for(var i = 0; i < itemCount; i++){
			items.push(item);
		}
	}
	
	var getItemBySingularName = function(itemName){		
		var item = stock[itemName];		
		if(!item && itemName.endsWith("s")) item = stock[itemName.substring(0,itemName.length-1)];
		return item;
	}
	
	var that = {
		getPrice: function(basketContents){
			parseBasket(basketContents);
			
			var total = 0;
			
			for(var i = 0; i < items.length; i++){
				total += items[i].price;
			}
			
			return total.toFixed(2);
		}
	};
	
	return that;
};