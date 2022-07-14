const API = Cypress.env("API_URL") ?? "";

describe("user journey", () => {
	it("can submit data", () => {
		cy.intercept("GET", `${API}/cities`, {
			fixture: "cities.json",
		});
		cy.intercept("POST", `${API}/volunteer`, {
			statusCode: 200,
		}).as("createVolunteer");
		cy.visit("/");

		cy.findByRole("textbox", { name: /first name/i }).type("Jane");
		cy.findByRole("textbox", { name: /last name/i }).type("Doe");
		cy.findByRole("textbox", { name: /email/i }).type("jane.doe@example.com");
		cy.findByRole("combobox", { name: /location/i }).select("Glasgow");
		cy.findByRole("combobox", { name: /hear about/i }).select("Employer");
		cy.findByRole("textbox", { name: /employer/i }).type("BrewDog");
		cy.findByRole("button", { name: /submit/i }).click();

		cy.wait("@createVolunteer").then(({ request }) => {
			expect(request.body).to.deep.equal({
				cityName: "Glasgow",
				email: "jane.doe@example.com",
				employer: "BrewDog",
				firstName: "Jane",
				hearAboutCYF: "Employer",
				lastName: "Doe",
			});
		});
	});

	it("employer is optional if that isn't how they heard about CYF", () => {
		cy.intercept("GET", `${API}/cities`, {
			fixture: "cities.json",
		});
		cy.visit("/");

		cy.findByRole("textbox", { name: /employer/i }).should(
			"not.have.attr",
			"required",
		);

		cy.findByRole("combobox", { name: /hear about/i }).select("Employer");
		cy.findByRole("textbox", { name: /employer/i }).should(
			"have.attr",
			"required",
		);

		cy.findByRole("combobox", { name: /hear about/i }).select(
			"Colleague or friend",
		);
		cy.findByRole("textbox", { name: /employer/i }).should(
			"not.have.attr",
			"required",
		);
	});
});
