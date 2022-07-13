import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App component", () => {
	it("renders a form", () => {
		render(<App />);
		expect(
			screen.getByRole("textbox", { name: /first name/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("textbox", { name: /last name/i }),
		).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
	});

	it("requires first and last name", () => {
		render(<App />);
		expect(screen.getByRole("textbox", { name: /first name/i })).toBeRequired();
		expect(screen.getByRole("textbox", { name: /last name/i })).toBeRequired();
	});
});
