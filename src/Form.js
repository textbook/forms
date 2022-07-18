import getInput from "./inputs";

function Form({ data, errors, formDefinition, onChange }) {
	return formDefinition.map(
		({ choices, field, hidden, label, required, type, ...props }) => {
			const Component = getInput(type);
			const hiddenField =
				typeof hidden === "function" ? hidden(data) : !!hidden;
			const requiredField =
				typeof required === "function" ? required(data) : !!required;

			if (hiddenField) {
				return null;
			}
			return (
				<Component
					key={field}
					choices={choices?.map((choice) =>
						typeof choice === "string"
							? { name: choice, value: choice }
							: choice,
					)}
					error={errors?.[field]}
					label={requiredField ? `${label}*` : label}
					onChange={(value) => onChange({ field, value })}
					required={requiredField}
					value={data[field]}
					{...props}
				/>
			);
		},
	);
}

export default Form;
