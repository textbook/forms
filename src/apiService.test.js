import { rest } from "msw";

import * as apiService from "./apiService";

describe("API service", () => {
	describe("getCities", () => {
		const cities = [
			{ _id: "abc123", name: "Gotham City", visibleIn: ["VOLUNTEER_FORM"] },
			{ _id: "def456", name: "Metropolis", visibleIn: [] },
			{
				_id: "ghi789",
				name: "Blüdhaven",
				visibleIn: ["DASHBOARD", "VOLUNTEER_FORM"],
			},
		];

		it("fetches and exposes visible cities in a useful order", async () => {
			global.server.use(
				rest.get("/cities", (req, res, ctx) => {
					return res(ctx.status(200), ctx.json({ cities }));
				}),
			);

			await expect(apiService.getCities()).resolves.toEqual([
				{ name: "Blüdhaven", value: "ghi789" },
				{ name: "Gotham City", value: "abc123" },
			]);
		});

		it("throws on non-2xx response", async () => {
			global.server.use(
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
			global.server.use(
				rest.post("/volunteer", async (req, res, ctx) => {
					sent = await req.json();
					return res(ctx.status(200));
				}),
			);

			await apiService.postVolunteer(volunteer);

			expect(sent).toEqual(volunteer);
		});

		it("throws on non-2xx response", async () => {
			global.server.use(
				rest.post("/volunteer", (req, res, ctx) => {
					return res(ctx.status(400), ctx.json({ error: "lol whoops" }));
				}),
			);

			await expect(apiService.postVolunteer({})).rejects.toThrow("lol whoops");
		});
	});
});
