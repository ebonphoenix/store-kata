var basketPricer = function(){
	var items = false;
	var that = {
		getPrice: function(purchaseDate){
			return items? .10 : 0;
		},
		addItem: function(item){
			items = item;
		}
	};
	
	return that;
};