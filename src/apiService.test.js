import { rest } from "msw";
import { setupServer } from "msw/node";

import * as apiService from "./apiService";

const server = setupServer();

describe("API service", () => {
	beforeAll(() => server.listen());

	beforeEach(() => server.resetHandlers());

	afterAll(() => server.close());

	describe("getCities", () => {
		const cities = [
			{ _id: "abc123", name: "Gotham", visibleIn: ["VOLUNTEER_FORM"] },
			{ _id: "def456", name: "Metropolis", visibleIn: [] },
		];

		it("fetches and exposes visible cities", async () => {
			server.use(
				rest.get("/cities", (req, res, ctx) => {
					return res(ctx.status(200), ctx.json({ cities }));
				}),
			);

			await expect(apiService.getCities()).resolves.toEqual([
				{ name: "Gotham", value: "abc123" },
			]);
		});

		it("throws on non-2xx response", async () => {
			server.use(
				rest.get("/cities", (req, res, ctx) => {
					return res(ctx.status(404));
				}),
			);

			await expect(apiService.getCities()).rejects.toThrow("Not Found");
		});
	});

	describe("postVolunteer", () => {
		it("posts the volunteer data", async () => {
			const volunteer = {
				cityName: "Gotham",
				firstName: "Bruce",
				lastName: "Wayne",
			};
			let sent;
			server.use(
				rest.post("/volunteer", async (req, res, ctx) => {
					sent = await req.json();
					return res(ctx.status(200));
				}),
			);

			await apiService.postVolunteer(volunteer);

			expect(sent).toEqual(volunteer);
		});

		it("throws on non-2xx response", async () => {
			server.use(
				rest.post("/volunteer", (req, res, ctx) => {
					return res(ctx.status(404));
				}),
			);

			await expect(apiService.postVolunteer({})).rejects.toThrow("Not Found");
		});
	});
});
