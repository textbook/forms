const API = Cypress.env("API_URL") ?? "";

describe("user journey", () => {
	it("can submit data", () => {
		cy.visit("/");
		cy.intercept("GET", `${API}/cities`, {
			fixture: "cities.json",
		});
		cy.intercept("POST", `${API}/volunteer`, {
			statusCode: 200,
		}).as("createVolunteer");

		cy.findByRole("textbox", { name: /first name/i }).type("Jane");
		cy.findByRole("textbox", { name: /last name/i }).type("Doe");
		cy.findByRole("combobox", { name: /location/i }).select("Glasgow");
		cy.findByRole("button", { name: /submit/i }).click();

		cy.wait("@createVolunteer").then(({ request }) => {
			expect(request.body).to.deep.equal({
				cityName: "Glasgow",
				firstName: "Jane",
				lastName: "Doe",
			});
		});
	});
});
