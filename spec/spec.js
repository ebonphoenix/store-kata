describe("Store Kata - ", function() {
	var basket;
	
	beforeEach(function(){
		basket = basketPricer();
	});
  describe("Acceptance Tests", function(){
	  it("A basket containing: 3 tins of soup and 2 loaves of bread, bought today, should cost 3.15", function(){
		  expect(basket.getPrice("Price a basket containing: 3 tins of soup and 2 loaves of bread, bought today")).toEqual(3.15);
	  });
	  
	  it("A basket containing: 6 apples and a bottle of milk, bought today, should cost 1.90", function(){
		  expect(basket.getPrice("Price a basket containing: 6 apples and a bottle of milk, bought today")).toEqual(1.90);
	  });
	  
	  it("A basket containing: 6 apples and a bottle of milk, bought in 5 days time, should cost 1.84", function(){
		  expect(basket.getPrice("Price a basket containing: 6 apples and a bottle of milk, bought in 5 days time")).toEqual(1.84);
	  });
	  
	  it("A basket containing: 3 apples, 2 tins of soup and a loaf of bread, bought in 5 days time, should cost 1.97", function(){
		  expect(basket.getPrice("Price a basket containing: 3 apples, 2 tins of soup and a loaf of bread, bought in 5 days time")).toEqual(1.97);
	  });
  });
  fdescribe("Development Tests", function(){
	  it("An empty basket should cost 0.00", function(){
		  expect(basket.getPrice("Price a basket containing: , bought today")).toEqual(0);
	  });
	  it("A single apple should cost .10", function() {
		  expect(basket.getPrice("Price a basket containing: an apple, bought today")).toEqual(.10);
	  });
	  
	  it("A two apples should cost .20", function() {
		  expect(basket.getPrice("Price a basket containing: 2 apples, bought today")).toEqual(.20);
	  });
	  
  });
  
});