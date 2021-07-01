
var basketPricer = function(stock, discounts, parser){
	
	var getItemBySingularName = function(itemName){		
		var item = stock.getItemByName(itemName);		
		if(!item && itemName.endsWith("s")) item = stock.getItemByName(itemName.substring(0,itemName.length-1));
		return item;
	}
	
	var that = {
		getPrice: function(basketContents){
			var basketInfo = parser.parse(basketContents);
			
			var items = basketInfo.itemNames.map(getItemBySingularName);
			var total = items.reduce((accumulator, item)=> accumulator + item.price,0);
			total = discounts.getDiscountedPrice(items, total, basketInfo.purchaseDate);
			
			return total.toFixed(2);
		}
	};
	
	return that;
};

var basketParser = function(){
	var basketInfo = {
		itemNames : [],
		purchaseDate: dateMath.dateOnly( new Date())
	};
	
	var parseBasket = function(basketContents){
		var basketContentsRegEx = /^Price a basket containing: (.*), bought (.*)$/;
		var matches = basketContents.match(basketContentsRegEx);
		parseContents(matches[1]);
		parseDate(matches[2]);
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
		
		var basketItemRegEx = /^(\d+)?.* (\w+)$/;
		var matches = basketItem.match(basketItemRegEx);
		
		if(!matches) return;
		
		var itemCount = matches[1]? matches[1] : 1, itemName = matches[2];
		
		for(var i = 0; i < itemCount; i++){
			basketInfo.itemNames.push(itemName);
		}
	}
	
	var parseDate = function(purchaseDate){
		var inDaysTimeRegEx = /^in (\d+) days time$/
		
		var matches = purchaseDate.match(inDaysTimeRegEx);
		if(!matches) return;
		
		var daysOffset = parseInt(matches[1],10);
		basketInfo.purchaseDate = dateMath.addDays(basketInfo.purchaseDate, daysOffset);
	}
	
	var that = {
		parse: function(stringToParse){
			parseBasket(stringToParse);
			
			return basketInfo;
		}
	}
	return that;
};

var dateMath = function (){
	return {
		dateOnly: function (jsDate){
			return new Date(jsDate.getFullYear(),jsDate.getMonth(),jsDate.getDate());
		},
		addDays: function(date, daysOffset){
			
			var newDate = new Date(date);
			newDate.setDate(newDate.getDate() + daysOffset);
			return newDate;
		},
		addMonths: function (date, monthsOffset, retainDay){
			var year = date.getFullYear();
			var monthIndex = date.getMonth();
			var day = retainDay? date.getDate():1;
			
			var newMonthIndex = monthsOffset + monthIndex;
			if(newMonthIndex > 11){
				years = Math.floor((newMonthIndex+1)/12);
				year += years;
			} 
			
			return new Date(year,newMonthIndex,day);
		}			
	};
}();

var storeDiscounts = function(){
	var threeDaysHence = function(){
		return dateMath.addDays( dateMath.dateOnly( new Date() ),3);
	}
	var endOfNextMonth = function(){
		var startOfMonthAfterNext = dateMath.addMonths( dateMath.dateOnly ( new Date() ),2);
		return dateMath.addDays(startOfMonthAfterNext, -1)
	}
	
	var discounts = [{
			startDate: threeDaysHence(),
			endDate: endOfNextMonth(),
			applyDiscount: function(items, currentPrice){
				var appleItems = items.filter(item => item.name === "apple");
				var discount = appleItems.reduce((currentDiscount, item) => currentDiscount + (item.price * .1),0);
				return currentPrice - discount;
			}
		}
	];
	
	var dateWithinRange = function(date, rangeStart, rangeEnd){
		return rangeStart <= date && rangeEnd >= date;
	};
	
	return {
		getDiscountedPrice: function(items, currentPrice, purchaseDate){
			var activeDiscounts = discounts.filter(discount => dateWithinRange(purchaseDate,discount.startDate, discount.endDate));
			return activeDiscounts.reduce((price, discount)=> discount.applyDiscount(items, price),currentPrice);
		}
	};
}();

var storeStock = function(){ 
	var storeItems = [{
			name: "apple",
			unit: "single",
			price: .10
		},
		{
			name: "milk",
			unit: "bottle",
			price: 1.30
		},
		{
			name: "bread",
			unit: "loaf",
			price: .80
		},
		{
			name: "soup",
			unit: "tin",
			price: .65
		}];
	
	return {
		getItemByName: function(itemName){
			return storeItems.find(item => item.name===itemName);
		},
		items: storeItems
	};
}();