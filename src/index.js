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
		var basketContentsRegEx = /^Price a basket containing: (.*), .*$/;
		parseContents(basketContents.match(basketContentsRegEx)[1]);
	}
	
	var parseContents = function(basketContents){
		if (!basketContents) return;
		
		var basketItemRegEx = /(\d)? (\w+)$/;
		var matches = basketContents.match(basketItemRegEx);
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
			
			return total;
		}
	};
	
	return that;
};