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
						required: true,
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

	it("creates required fields from static data", () => {
		render(
			<Form
				data={{ some: "value" }}
				formDefinition={[
					{ field: "some", label: "some", required: true, type: "text" },
					{ field: "other", label: "other", required: false, type: "text" },
				]}
				onChange={() => {}}
				onSubmit={() => {}}
			/>,
		);

		expect(screen.getByRole("textbox", { name: "some*" })).toBeRequired();
		expect(screen.getByRole("textbox", { name: "other" })).not.toBeRequired();
	});

	it("creates required fields from dynamic data", () => {
		render(
			<Form
				data={{ some: "value" }}
				formDefinition={[
					{
						choices: ["value"],
						field: "some",
						label: "some",
						required: false,
						type: "select",
					},
					{
						field: "other",
						label: "other",
						required: (data) => data.some === "value",
						type: "text",
					},
				]}
				onChange={() => {}}
				onSubmit={() => {}}
			/>,
		);

		expect(screen.getByRole("combobox", { name: "some" })).not.toBeRequired();
		expect(screen.getByRole("textbox", { name: "other*" })).toBeRequired();
	});

	it("supports email addresses", () => {
		render(
			<Form
				data={{}}
				formDefinition={[
					{
						field: "email",
						label: "Email address",
						required: true,
						type: "email",
					},
				]}
				onChange={() => {}}
				onSubmit={() => {}}
			/>,
		);

		const textbox = screen.getByRole("textbox", { name: /email/i });
		expect(textbox).toHaveAttribute("autocomplete", "email");
		expect(textbox).toHaveAttribute("spellcheck", "false");
		expect(textbox).toHaveAttribute("type", "email");
	});

	it("supports phone numbers", () => {
		render(
			<Form
				data={{}}
				formDefinition={[
					{
						field: "tel",
						label: "Phone number",
						type: "tel",
					},
				]}
				onChange={() => {}}
				onSubmit={() => {}}
			/>,
		);

		const textbox = screen.getByRole("textbox", { name: /phone/i });
		expect(textbox).toHaveAttribute("autocomplete", "tel");
		expect(textbox).toHaveAttribute("type", "tel");
	});

	it("supports descriptions", () => {
		render(
			<Form
				data={{}}
				formDefinition={[
					{
						description: "something that expands on why",
						field: "some",
						type: "text",
					},
					{
						choices: [],
						description: "something else",
						field: "other",
						type: "select",
					},
				]}
				onChange={() => {}}
				onSubmit={() => {}}
			/>,
		);

		expect(
			screen.getByLabelText(/something that expands on why/i),
		).toBeInTheDocument();
		expect(screen.getByLabelText(/something else/i)).toBeInTheDocument();
	});

	it("supports textareas", () => {
		render(
			<Form
				data={{}}
				formDefinition={[
					{
						field: "field",
						label: "label",
						type: "textarea",
					},
				]}
				onChange={() => {}}
				onSubmit={() => {}}
			/>,
		);

		const textbox = screen.getByRole("textbox", { name: /label/i });
		expect(textbox).toHaveAttribute("cols", "30");
		expect(textbox).toHaveAttribute("rows", "5");
	});

	it("supports checkboxes", () => {
		render(
			<Form
				data={{}}
				formDefinition={[
					{
						field: "field",
						label: "some",
						required: true,
						type: "checkbox",
					},
				]}
				onChange={() => {}}
				onSubmit={() => {}}
			/>,
		);

		const checkbox = screen.getByRole("checkbox", { name: /some/i });
		expect(checkbox).toBeRequired();
	});

	it("supports JSX content", () => {
		render(
			<Form
				data={{}}
				formDefinition={[
					{
						field: "field",
						label: 'Check the <a href="http://example.com">Terms of Use</a>',
						required: true,
						type: "checkbox",
					},
				]}
				onChange={() => {}}
				onSubmit={() => {}}
			/>,
		);

		expect(screen.getByRole("link", { name: /terms of use/i })).toHaveAttribute(
			"href",
			"http://example.com",
		);
	});
});
