import getInput from "./inputs";

function Form({ data, formDefinition, onChange, onSubmit }) {
	return (
		<form onSubmit={onSubmit}>
			{formDefinition.map(
				({ choices, field, label, required, type, ...props }) => {
					const Component = getInput(type);
					const requiredField =
						typeof required === "function" ? required(data) : !!required;

					return (
						<Component
							key={field}
							choices={choices?.map((choice) =>
								typeof choice === "string"
									? { name: choice, value: choice }
									: choice,
							)}
							label={requiredField ? `${label}*` : label}
							onChange={(value) => onChange({ field, value })}
							required={requiredField}
							value={data[field]}
							{...props}
						/>
					);
				},
			)}
			<button type="submit">Submit</button>
		</form>
	);
}

export default Form;
