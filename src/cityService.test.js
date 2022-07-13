import { rest } from "msw";
import { setupServer } from "msw/node";

import * as cityService from "./cityService";

const server = setupServer();

const cities = [
	{
		name: "Gotham",
		visibleIn: ["VOLUNTEER_FORM"],
	},
	{
		name: "Metropolis",
		visibleIn: [],
	},
];

describe("cities service", () => {
	beforeAll(() => server.listen());

	beforeEach(() => server.resetHandlers());

	afterAll(() => server.close());

	it("fetches and exposes visible city names", async () => {
		server.use(
			rest.get("/cities", (req, res, ctx) => {
				return res(ctx.status(200), ctx.json({ cities }));
			}),
		);

		await expect(cityService.getAll()).resolves.toEqual(["Gotham"]);
	});

	it("throws on non-2xx response", async () => {
		server.use(
			rest.get("/cities", (req, res, ctx) => {
				return res(ctx.status(404));
			}),
		);

		await expect(cityService.getAll()).rejects.toThrow("Not Found");
	});
});
