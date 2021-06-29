describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
  it("should call the code under test", function() {
	  expect(helloWorld).toEqual("Hello World");
  });
});