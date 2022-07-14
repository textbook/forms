import { Select, Text } from "./inputs";

function component(type) {
	switch (type) {
		case "select":
			return Select;
		default:
			return Text;
	}
}

function Form({ data, formDefinition, onChange, onSubmit }) {
	return (
		<form onSubmit={onSubmit}>
			{formDefinition.map(({ choices, field, label, required, type }) => {
				const Component = component(type);
				return (
					<Component
						choices={choices}
						key={field}
						label={label}
						onChange={(value) => onChange({ field, value })}
						required={
							typeof required === "function" ? required(data) : required
						}
						value={data[field]}
					/>
				);
			})}
			<button type="submit">Submit</button>
		</form>
	);
}

export default Form;
