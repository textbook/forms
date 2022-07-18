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

		cy.findByRole("textbox", { name: /given name/i }).type("Jane");
		cy.findByRole("textbox", { name: /family name/i }).type("Doe");
		cy.findByRole("textbox", { name: /email/i }).type("jane.doe@example.com");
		cy.findByRole("combobox", { name: /location/i }).select("Glasgow");
		cy.findByRole("textbox", { name: /phone/i }).type("+44 7700 900 987");
		cy.findByRole("textbox", { name: /why do you want to volunteer/i }).type(
			"I am a helpful person",
		);
		cy.findByRole("combobox", { name: /industry/i }).select(
			"Engineering and Construction",
		);
		cy.findByRole("combobox", { name: /hear about/i }).select("Employer");
		cy.findByRole("combobox", { name: /employer/i }).select("Other");
		cy.findByRole("checkbox", { name: /react/i }).check();
		cy.findByRole("radio", { name: /professional/i }).check();
		cy.findByRole("checkbox", { name: /terms of use/i }).check();
		cy.findByRole("checkbox", { name: /contact me/i }).check();
		cy.findByRole("button", { name: /submit/i }).click();

		cy.wait("@createVolunteer").then(({ request }) => {
			expect(request.body).to.deep.equal({
				agreeToReceiveCommunication: true,
				agreeToTOU: true,
				cityId: "5c7fa02021b123001b68665b",
				email: "jane.doe@example.com",
				employer: "Other",
				firstName: "Jane",
				hearAboutCYF: "Employer",
				industry: "Engineering and Construction",
				interestedInCYF: "I am a helpful person",
				lastName: "Doe",
				techSkill: [{ name: "ReactJS", level: "Professional experience" }],
				tel: "+44 7700 900 987",
			});
		});
	});

	it("employer is optional if that isn't how they heard about CYF", () => {
		cy.intercept("GET", `${API}/cities`, {
			fixture: "cities.json",
		});
		cy.visit("/");

		cy.findByRole("combobox", { name: /employer/i }).should(
			"not.have.attr",
			"required",
		);

		cy.findByRole("combobox", { name: /hear about/i }).select("Employer");
		cy.findByRole("combobox", { name: /employer/i }).should(
			"have.attr",
			"required",
		);

		cy.findByRole("combobox", { name: /hear about/i }).select(
			"Colleague or friend",
		);
		cy.findByRole("combobox", { name: /employer/i }).should(
			"not.have.attr",
			"required",
		);
	});
});
