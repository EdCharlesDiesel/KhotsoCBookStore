describe("Home page", () => {

	it("should display home title", () => {
		
		cy.visit('/');
		cy.contains("Khotso C Book Store");
	});


});