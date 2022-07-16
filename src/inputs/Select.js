import FormControl from "./FormControl";

function Select({ choices, description, label, onChange, required, value }) {
	return (
		<FormControl description={description} label={label}>
			<select
				onChange={({ target: { value } }) => onChange(value)}
				required={required}
				value={value ?? ""}
			>
				<option disabled value="">
					Select here
				</option>
				{choices.map(({ name, value }) => (
					<option key={value} value={value}>
						{name}
					</option>
				))}
			</select>
		</FormControl>
	);
}

export default Select;
