import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";

import App from "./App";

describe("App component", () => {
	it("disables form submit while waiting for response", async () => {
		global.server.use(
			rest.get("/cities", (req, res, ctx) => {
				return res(ctx.status(200), ctx.json({ cities: [] }));
			}),
			rest.post("/volunteer", (req, res, ctx) => {
				return res(ctx.status(200), ctx.json({ volunteer: {} }));
			}),
		);
		render(<App />);
		const submitButton = await screen.findByRole("button", { name: /submit/i });

		await userEvent.click(submitButton);
		expect(submitButton).toBeDisabled();

		await waitFor(() => expect(submitButton).not.toBeDisabled());
	});
});
