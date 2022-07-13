import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App component", () => {
	it("renders a form", () => {
		render(<App />);
		expect(screen.getByRole("textbox", { name: /first name/i })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
	});
});
