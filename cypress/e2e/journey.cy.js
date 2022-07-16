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
		cy.findByRole("textbox", { name: /phone/i }).type("+44 7700 900 987");
		cy.findByRole("combobox", { name: /hear about/i }).select("Employer");
		cy.findByRole("textbox", { name: /employer/i }).type("BrewDog");
		cy.findByRole("textbox", { name: /why do you want to volunteer/i }).type(
			"I am a helpful person",
		);
		cy.findByRole("checkbox", { name: /terms of use/i }).check();
		cy.findByRole("button", { name: /submit/i }).click();

		cy.wait("@createVolunteer").then(({ request }) => {
			expect(request.body).to.deep.equal({
				agreeToTOU: true,
				cityId: "5c7fa02021b123001b68665b",
				email: "jane.doe@example.com",
				employer: "BrewDog",
				firstName: "Jane",
				hearAboutCYF: "Employer",
				interestedInCYF: "I am a helpful person",
				lastName: "Doe",
				tel: "+44 7700 900 987",
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
