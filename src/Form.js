import { Email, PhoneNumber, Select, Text } from "./inputs";

function component(type) {
	switch (type) {
		case "email":
			return Email;
		case "select":
			return Select;
		case "tel":
			return PhoneNumber;
		default:
			return Text;
	}
}

function Form({ data, formDefinition, onChange, onSubmit }) {
	return (
		<form onSubmit={onSubmit}>
			{formDefinition.map(({ choices, field, label, required, type }) => {
				const Component = component(type);
				required = typeof required === "function" ? required(data) : required;

				return (
					<Component
						choices={choices}
						key={field}
						label={required ? `${label}*` : label}
						onChange={(value) => onChange({ field, value })}
						required={required}
						value={data[field]}
					/>
				);
			})}
			<button type="submit">Submit</button>
		</form>
	);
}

export default Form;
