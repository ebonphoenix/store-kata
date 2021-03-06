describe("Store Kata - ", function() {
  var basket;
	
  beforeEach(function(){
	basket = basketPricer(storeStock, storeDiscounts, basketParser());
  });
  describe("Acceptance Tests", function(){
	  
	  it("A basket containing: 6 apples and a bottle of milk, bought today, should cost 1.90", function(){
		  expect(basket.getPrice("Price a basket containing: 6 apples and a bottle of milk, bought today")).toEqual("1.90");
	  });
	  
	  it("A basket containing: 6 apples and a bottle of milk, bought in 5 days time, should cost 1.84", function(){
		  expect(basket.getPrice("Price a basket containing: 6 apples and a bottle of milk, bought in 5 days time")).toEqual("1.84");
	  });
	  
	  it("A basket containing: 3 tins of soup and 2 loaves of bread, bought today, should cost 3.15", function(){
		  expect(basket.getPrice("Price a basket containing: 3 tins of soup and 2 loaves of bread, bought today")).toEqual("3.15");
	  });
	  it("A basket containing: 3 apples, 2 tins of soup and a loaf of bread, bought in 5 days time, should cost 1.97", function(){
		  expect(basket.getPrice("Price a basket containing: 3 apples, 2 tins of soup and a loaf of bread, bought in 5 days time")).toEqual("1.97");
	  });
  });
  describe("Development Tests", function(){
	  describe("command parsing and basic calculation", function(){
		  it("An empty basket should cost 0.00", function(){
			  expect(basket.getPrice("Price a basket containing: , bought today")).toEqual("0.00");
		  });
		  it("A single apple should cost 0.10", function() {
			  expect(basket.getPrice("Price a basket containing: an apple, bought today")).toEqual("0.10");
		  });
		  
		  it("Two apples should cost 0.20", function() {
			  expect(basket.getPrice("Price a basket containing: 2 apples, bought today")).toEqual("0.20");
		  });
		  it("100 apples should cost 10.00",function(){
			  expect(basket.getPrice("Price a basket containing: 100 apples, bought today")).toEqual("10.00");
		  });
		  
		  it("A loaf of bread should cost 0.80", function(){
			  expect(basket.getPrice("Price a basket containing: a loaf of bread, bought today")).toEqual("0.80");
		  });
		  
		  it("2 loaves of bread should cost 1.60", function(){
			  expect(basket.getPrice("Price a basket containing: 2 loaves of bread, bought today")).toEqual("1.60");
		  });
		  
		  it("A bottle of milk should cost 1.30", function(){
			  expect(basket.getPrice("Price a basket containing: a bottle of milk, bought today")).toEqual("1.30");
		  });
			  
		  it("A tin of soup should cost 0.65", function(){
			  expect(basket.getPrice("Price a basket containing: a tin of soup, bought today")).toEqual("0.65");
		  });
		  
		  it("4 apples and a loaf of bread should cost 1.20", function(){
			  expect(basket.getPrice("Price a basket containing: 4 apples and a loaf of bread, bought today")).toEqual("1.20");
		  } );
		  
		  it("a bottle of milk, 2 apples and 3 tins of soup should cost 3.45", function(){
			  expect(basket.getPrice("Price a basket containing: a bottle of milk, 2 apples and 3 tins of soup, bought today")).toEqual("3.45");
		  });
		  it("should notify the customer if it could not price an item", function(){
			  expect(basket.getPrice("Price a basket containing: a block of cheese, bought today")).toEqual("An item not stocked was requested, please remove from basket");
		  });
	  });
	  describe("discount funkiness", function(){
		  describe("discounted apples", function(){
			  beforeAll(function(){
				  this.currentDate = dateMath.dateOnly(new Date());
				  this.startOfMonthAfterNext = dateMath.addMonths(this.currentDate,2);
			  });
			  
			  
			  it("apples bought before the sale are full price",function(){
				  expect(basket.getPrice("Price a basket containing: an apple, bought in 2 days time")).toEqual("0.10");
			  });
			  it("apples bought after the sale starts are discounted",function(){
				  expect(basket.getPrice("Price a basket containing: an apple, bought in 3 days time")).toEqual("0.09");
			  });
			  
			  it("apples bought the last day of the sale are discounted", function(){				  
				  expect(basket.getPrice("Price a basket containing: an apple, bought in " + (dateMath.daysBetweenDates(this.currentDate, this.startOfMonthAfterNext) - 1) + " days time")).toEqual("0.09");
			  });
			  it("apples bought after the sale are discounted", function(){
				  expect(basket.getPrice("Price a basket containing: an apple, bought in " + dateMath.daysBetweenDates(this.currentDate, this.startOfMonthAfterNext) + " days time")).toEqual("0.10");
			  });
		  });
		  describe("soup and bread deal", function(){
			  
			it("bread should be half price when 2 tins of soup are purchased today", function(){
			  expect(basket.getPrice("Price a basket containing: 2 tins of soup and a loaf of bread, bought today")).toEqual("1.70");
			});
			
			it("When four cans of soup and two loaves of bread are puchased both loaves should be discounted", function(){
			  expect(basket.getPrice("Price a basket containing: 4 tins of soup and 2 loaves of bread, bought today")).toEqual("3.40");
			});
			it("the soup and bread deal should not apply to purchases made before the sale",function(){
				expect(basket.getPrice("Price a basket containing: 2 tins of soup and a loaf of bread, bought 2 days ago")).toEqual("2.10");
			});
			it("the soup and bread deal should apply to purchases made the first day of the sale",function(){
				expect(basket.getPrice("Price a basket containing: 2 tins of soup and a loaf of bread, bought 1 day ago")).toEqual("1.70");
			});
			it("the soup and bread deal should apply to purchases made the last day of the sale",function(){
				expect(basket.getPrice("Price a basket containing: 2 tins of soup and a loaf of bread, bought in 6 days time")).toEqual("1.70");
			});
			it("the soup and bread deal should not apply to purchases made after the last day of the sale",function(){
				expect(basket.getPrice("Price a basket containing: 2 tins of soup and a loaf of bread, bought in 7 days time")).toEqual("2.10");
			});
		  });		  
	  });
	  describe("Date math fun", function() {
		  it("dateOnly should remove all time info from a date object",function(){
			  var someComplexDate = new Date("August 19, 1975 23:15:30");
			  var dateOnly = dateMath.dateOnly(someComplexDate);
			  
			  expect(dateOnly.getFullYear()).toEqual(1975);
			  expect(dateOnly.getMonth()).toEqual(7);
			  expect(dateOnly.getDate()).toEqual(19);
			  expect(dateOnly.getHours()).toEqual(0);
			  expect(dateOnly.getMinutes()).toEqual(0);
			  expect(dateOnly.getSeconds()).toEqual(0);
		  });
		  describe("addDays method", function(){
			  it("should advance the days by the specified amount", function(){
				  var someDate = new Date(2019,3,5);
				  
				  var newDate = dateMath.addDays(someDate, 3);
				  
				  expect(newDate.getFullYear()).toEqual(2019);
				  expect(newDate.getMonth()).toEqual(3);
				  expect(newDate.getDate()).toEqual(8);
			  });
					  
			  it("should deduct the days by the specified amount when negative number is used", function(){
				  var someDate = new Date(2019,3,5);
				  
				  var newDate = dateMath.addDays(someDate, -1);
				  
				  expect(newDate.getFullYear()).toEqual(2019);
				  expect(newDate.getMonth()).toEqual(3);
				  expect(newDate.getDate()).toEqual(4);
			  });
			  it("should advance month and year when appropriate", function(){
				  var someDate = new Date(1999,11,25);
				  
				  var newDate = dateMath.addDays(someDate, 15);
				  
				  expect(newDate.getFullYear()).toEqual(2000);
				  expect(newDate.getMonth()).toEqual(0);
				  expect(newDate.getDate()).toEqual(9);
			  });
		  });
		  describe("addMonths method", function(){
			  it("should advance the months by the amount specified and default to the first day of that month", function(){
				  var someDate = new Date(2019,3,5);
				  
				  var newDate = dateMath.addMonths(someDate, 3);
				  
				  expect(newDate.getFullYear()).toEqual(2019);
				  expect(newDate.getMonth()).toEqual(6);
				  expect(newDate.getDate()).toEqual(1);
			  });
			  it("should advance the months by the amount specified and retain the day if specified", function(){
				  var someDate = new Date(2019,3,5);
				  
				  var newDate = dateMath.addMonths(someDate, 3, true);
				  
				  expect(newDate.getFullYear()).toEqual(2019);
				  expect(newDate.getMonth()).toEqual(6);
				  expect(newDate.getDate()).toEqual(5);
			  });
			  it("should deduct the month if a negative number is used", function(){
				  var someDate = new Date(2019,3,5);
				  
				  var newDate = dateMath.addMonths(someDate, -2);
				  
				  expect(newDate.getFullYear()).toEqual(2019);
				  expect(newDate.getMonth()).toEqual(1);
				  expect(newDate.getDate()).toEqual(1);
			  });
			  
			  it("should handle year end", function(){
				  var someDate = new Date(2019,10,5);
				  
				  var newDate = dateMath.addMonths(someDate, 20);
				  
				  expect(newDate.getFullYear()).toEqual(2023);
				  expect(newDate.getMonth()).toEqual(6);
				  expect(newDate.getDate()).toEqual(1);
			  });
		  });
		  describe("daysBetweenDates method", function(){
			  it("should return 3 for days three days apart", function(){
				  var earlyDate = new Date(1999,11,30);
				  var laterDate = new Date(2000,0, 2);
				  
				  expect(dateMath.daysBetweenDates(earlyDate,laterDate)).toEqual(3);
			  });
			  it("should return 0 for the same day", function(){
				  var someDate = new Date(1999,11,30);
				  
				  expect(dateMath.daysBetweenDates(someDate,someDate)).toEqual(0);
			  });
		  });
		  describe("dateWithinRange method", function(){
			  it("should return false if the date is before the range start date", function(){
				  var date = new Date(2013,1,3);
				  var rangeStartDate = new Date(2013,1,4);
				  var rangeEndDate = new Date(2013,1,6);
				  
				  expect(dateMath.dateWithinRange(date,rangeStartDate,rangeEndDate)).toBeFalse();
			  });
			  it("should return true if the same date as the range start date", function(){
				  var date = new Date(2013,1,4);
				  var rangeEndDate = new Date(2013,1,6);
				  
				  expect(dateMath.dateWithinRange(date,date,rangeEndDate)).toBeTrue();
			  });
			  it("should return true if the date is between the range start date and the range end date", function(){
				  var date = new Date(2013,1,5);
				  var rangeStartDate = new Date(2013,1,4);
				  var rangeEndDate = new Date(2013,1,6);
				  
				  expect(dateMath.dateWithinRange(date,rangeStartDate,rangeEndDate)).toBeTrue();
			  });
			  it("should return true if the same date as the range end date", function(){
				  var date = new Date(2013,1,6);
				  var rangeStartDate = new Date(2013,1,4);
				  
				  expect(dateMath.dateWithinRange(date,rangeStartDate,date)).toBeTrue();
			  });
			  it("should return false if the date is after the range end date", function(){
				  var date = new Date(2013,1,7);
				  var rangeStartDate = new Date(2013,1,4);
				  var rangeEndDate = new Date(2013,1,6);
				  
				  expect(dateMath.dateWithinRange(date,rangeStartDate,rangeEndDate)).toBeFalse();
			  });
		  });
	  });
  });
  
});