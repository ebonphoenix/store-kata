var basketPricer = function(){
	var items = [];
	var parseBasket = function(basketContents){
		var basketContentsRegEx = /^Price a basket containing: (.*), .*$/;
		parseContents(basketContents.match(basketContentsRegEx)[1]);
	}
	
	var parseContents = function(basketContents){
		if (!basketContents) return;
		
		var basketItemRegEx = /(\d) \w+/;
		var itemCount = basketContents.match(basketItemRegEx)[1];
		for(var i = 0; i < itemCount; i++){
			items.push("apple");
		}
	}
	
	var that = {
		getPrice: function(basketContents){
			parseBasket(basketContents);
			
			return items.length * .1;
		}
	};
	
	return that;
};