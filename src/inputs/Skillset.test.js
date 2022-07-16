import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Skillset from "./Skillset";

describe("Skillset component", () => {
	it("renders the section title", () => {
		const label = "Some specific skillset";
		render(<Skillset choices={[]} label={label} />);
		expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(label);
	});

	it("renders a list of checkboxes", () => {
		const choices = [
			{ name: "Foo", value: "foo" },
			{ name: "Bar", value: "bar" },
		];

		render(<Skillset choices={choices} />);

		choices.forEach(({ name }) => {
			expect(screen.getByRole("checkbox", { name })).toBeInTheDocument();
		});
	});

	it("shows experience levels when a skill is selected", async () => {
		render(<Skillset choices={[{ name: "Baz", value: "baz" }]} />);
		await userEvent.click(screen.getByRole("checkbox", { name: "Baz" }));
		["Some", "Professional experience"].forEach((level) => {
			expect(screen.getByRole("radio", { name: level })).toBeInTheDocument();
		});
	});

	it("expands selected values", () => {
		render(
			<Skillset
				choices={[{ name: "Baz", value: "baz" }]}
				value={[{ level: "Some", name: "baz" }]}
			/>,
		);
		expect(screen.getByRole("checkbox", { name: "Baz" })).toBeChecked();
		expect(screen.getByRole("radio", { name: "Some" })).toBeChecked();
		expect(
			screen.getByRole("radio", { name: "Professional experience" }),
		).not.toBeChecked();
	});

	it("adds items to the list", async () => {
		const onChange = jest.fn();
		render(
			<Skillset
				choices={[{ name: "Baz", value: "baz" }]}
				onChange={onChange}
				value={[]}
			/>,
		);
		await userEvent.click(screen.getByRole("checkbox", { name: "Baz" }));
		await userEvent.click(
			screen.getByRole("radio", { name: "Professional experience" }),
		);
		expect(onChange).toHaveBeenCalledWith([
			{ level: "Professional experience", name: "baz" },
		]);
	});

	it("removes items from the list", async () => {
		const onChange = jest.fn();
		render(
			<Skillset
				choices={[{ name: "Baz", value: "baz" }]}
				onChange={onChange}
				value={[{ level: "Some", name: "baz" }]}
			/>,
		);
		await userEvent.click(screen.getByRole("checkbox", { name: "Baz" }));
		expect(onChange).toHaveBeenCalledWith([]);
	});

	it("allows level to change", async () => {
		const onChange = jest.fn();
		render(
			<Skillset
				choices={[{ name: "Baz", value: "baz" }]}
				onChange={onChange}
				value={[{ level: "Professional experience", name: "baz" }]}
			/>,
		);
		await userEvent.click(screen.getByRole("radio", { name: "Some" }));
		expect(onChange).toHaveBeenCalledWith([{ level: "Some", name: "baz" }]);
	});
});
