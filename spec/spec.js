describe("Store Kata - ", function() {
	var basket;

  	var addDaysToDate = function(startDate, daysToAdd){
		var newDay = startDate.getDate() + daysToAdd;
		var newDate = new Date(startDate);
		newDate.setDate(newDay);
		return newDate;
	};
	var today = new Date();
	var inFiveDays = addDaysToDate(today, 5);
	
	beforeEach(function(){
		basket = basketPricer();
	});
  describe("Acceptance Tests", function(){
	  it("A basket containing: 3 tins of soup and 2 loaves of bread, bought today, should cost 3.15", function(){
		  basket.addItem("soup");
		  basket.addItem("soup");
		  basket.addItem("soup");
		  basket.addItem("bread");
		  basket.addItem("bread");
		  
		  expect(basket.getPrice(today)).toEqual(3.15);
	  });
	  
	  it("A basket containing: 6 apples and a bottle of milk, bought today, should cost 1.90", function(){
		  basket.addItem("apple");
		  basket.addItem("apple");
		  basket.addItem("apple");
		  basket.addItem("apple");
		  basket.addItem("apple");
		  basket.addItem("apple");
		  basket.addItem("milk");
		  
		  expect(basket.getPrice(today)).toEqual(1.90);
	  });
	  
	  it("A basket containing: 6 apples and a bottle of milk, bought in 5 days time, should cost 1.84", function(){
		  basket.addItem("apple");
		  basket.addItem("apple");
		  basket.addItem("apple");
		  basket.addItem("apple");
		  basket.addItem("apple");
		  basket.addItem("apple");
		  basket.addItem("milk");
		  
		  expect(basket.getPrice(inFiveDays)).toEqual(1.84);
	  });
	  
	  it("A basket containing: 3 apples, 2 tins of soup and a loaf of bread, bought in 5 days time, should cost 1.97", function(){
		  basket.addItem("soup");
		  basket.addItem("soup");
		  basket.addItem("soup");
		  basket.addItem("bread");
		  basket.addItem("bread");
		  
		  expect(basket.getPrice(inFiveDays)).toEqual(1.97);
	  });
  });
  fdescribe("Development Tests", function(){
	  it("An empty basket should cost 0.00", function(){
		  expect(basket.getPrice(today)).toEqual(0);
	  });
	  it("A single apple should cost .10", function() {
		  basket.addItem("apple");
		  expect(basket.getPrice(today)).toEqual(.10);
	  });
  });
  
});