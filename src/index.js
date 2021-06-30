var basketPricer = function(){
	var items = false;
	var parseBasket = function(basketContents){
		var basketContentsRegEx = /^Price a basket containing: (.*), .*$/;
		items = basketContents.match(basketContentsRegEx)[1];
	}
	
	var that = {
		getPrice: function(basketContents){
			parseBasket(basketContents);
			return items? .10 : 0;
		}
	};
	
	return that;
};