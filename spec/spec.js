describe("Store Kata - ", function() {
	var basket;
	
	beforeEach(function(){
		basket = basketPricer(storeStock, storeDiscounts, basketParser());
	});
  xdescribe("Acceptance Tests - WIP",function(){
	  it("A basket containing: 3 tins of soup and 2 loaves of bread, bought today, should cost 3.15", function(){
		  expect(basket.getPrice("Price a basket containing: 3 tins of soup and 2 loaves of bread, bought today")).toEqual("3.15");
	  });
	  
	  it("A basket containing: 3 apples, 2 tins of soup and a loaf of bread, bought in 5 days time, should cost 1.97", function(){
		  expect(basket.getPrice("Price a basket containing: 3 apples, 2 tins of soup and a loaf of bread, bought in 5 days time")).toEqual("1.97");
	  });
  });
  describe("Acceptance Tests", function(){
	  
	  it("A basket containing: 6 apples and a bottle of milk, bought today, should cost 1.90", function(){
		  expect(basket.getPrice("Price a basket containing: 6 apples and a bottle of milk, bought today")).toEqual("1.90");
	  });
	  
	  it("A basket containing: 6 apples and a bottle of milk, bought in 5 days time, should cost 1.84", function(){
		  expect(basket.getPrice("Price a basket containing: 6 apples and a bottle of milk, bought in 5 days time")).toEqual("1.84");
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
	  });
	  describe("discount funkiness", function(){
		  it("an apple bought three days from now should cost 0.09",function(){
			  expect(basket.getPrice("Price a basket containing: an apple, bought in 3 days time")).toEqual("0.09");
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
	  });
  });
  
});