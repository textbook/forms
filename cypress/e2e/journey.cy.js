describe("user journey", () => {
	it("can submit data", () => {
		cy.visit("/");
		cy.intercept("POST", "/volunteer").as("createVolunteer");

		cy.findByRole("textbox", { name: /first name/i }).type("Jane");
		cy.findByRole("textbox", { name: /last name/i }).type("Doe");
		cy.findByRole("button", { name: /submit/i }).click();

		cy.wait("@createVolunteer").then(({ request }) => {
			expect(request.body).to.deep.equal({
				firstName: "Jane",
				lastName: "Doe",
			});
		});
	});
});
