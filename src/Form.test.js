import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Form from "./Form";

describe("Form component", () => {
	it("renders the supplied form", () => {
		render(
			<Form
				data={{ field: "value" }}
				formDefinition={[{ field: "field", label: "label", type: "text" }]}
				onChange={() => {}}
				onSubmit={() => {}}
			/>,
		);

		expect(screen.getByRole("textbox", { name: /label/i })).toHaveValue(
			"value",
		);
	});

	it("updates the parent on change", async () => {
		const onChange = jest.fn();
		render(
			<Form
				data={{ field: "value" }}
				formDefinition={[{ field: "field", label: "label", type: "text" }]}
				onChange={onChange}
				onSubmit={() => {}}
			/>,
		);

		await userEvent.type(screen.getByRole("textbox", { name: /label/i }), "!");

		expect(onChange).toHaveBeenCalledWith({ field: "field", value: "value!" });
	});

	it("updates the parent on submit", async () => {
		const onSubmit = jest
			.fn()
			.mockImplementation((event) => event.preventDefault());
		render(
			<Form
				data={{ field: "value" }}
				formDefinition={[{ field: "field", label: "label", type: "text" }]}
				onChange={() => {}}
				onSubmit={onSubmit}
			/>,
		);

		await userEvent.click(screen.getByRole("button", { name: /submit/i }));

		expect(onSubmit).toHaveBeenCalled();
	});

	it("renders select fields", async () => {
		const onChange = jest.fn();
		render(
			<Form
				data={{}}
				formDefinition={[
					{
						choices: ["some", "other"],
						field: "field",
						label: "label",
						type: "select",
					},
				]}
				onChange={onChange}
				onSubmit={() => {}}
			/>,
		);

		const select = screen.getByRole("combobox", { name: /label/i });
		const options = within(select).getAllByRole("option");
		expect(options.map((option) => option.textContent)).toEqual([
			"Select here",
			"some",
			"other",
		]);
		expect(options[0]).toBeDisabled();

		await userEvent.selectOptions(select, "other");

		expect(select).toBeRequired();
		expect(onChange).toHaveBeenCalledWith({ field: "field", value: "other" });
	});
});
