
var basketPricer = function(stock){
	var itemNames = [];
	
	var parseBasket = function(basketContents){
		var basketContentsRegEx = /^Price a basket containing: (.*), bought .*$/;
		parseContents(basketContents.match(basketContentsRegEx)[1]);
	}
	
	var parseContents = function(basketContents){
		if (!basketContents) return;
		
		var andConjunction = " and ";
		var commaConjunction = ", ";
		
		var andConjIndex = basketContents.lastIndexOf(andConjunction);
		var commaConjIndex = basketContents.lastIndexOf(commaConjunction);
				
		if(andConjIndex === -1 && commaConjIndex === -1 ){
			parseBasketItem(basketContents);
			return;
		}
		
		var remainingBasketLength, basketItemIndex = 0;
		if(andConjIndex > commaConjIndex){
			remainingBasketLength = andConjIndex;
			basketItemIndex = andConjIndex + andConjunction.length;
		} else {
			remainingBasketLength = commaConjIndex;
			basketItemIndex = commaConjIndex + commaConjunction.length;
		}
		
		parseBasketItem(basketContents.substring(basketItemIndex));
		parseContents(basketContents.substring(0,remainingBasketLength));
		
	}
	
	var parseBasketItem = function(basketItem){
		
		var basketItemRegEx = /^(\d)?.* (\w+)$/;
		var matches = basketItem.match(basketItemRegEx);
		
		if(!matches) return;
		
		var itemCount = matches[1]? matches[1] : 1, itemName = matches[2];
		
		for(var i = 0; i < itemCount; i++){
			itemNames.push(itemName);
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
			
			var items = itemNames.map(getItemBySingularName);
			var total = items.reduce((accumulator, item)=> accumulator + item.price,0);
			
			return total.toFixed(2);
		}
	};
	
	return that;
};

var storeStock = {
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