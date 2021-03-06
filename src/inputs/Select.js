import FormControl from "./FormControl";

function Select({
	choices,
	description,
	error,
	label,
	onChange,
	required,
	value,
}) {
	return (
		<FormControl description={description} error={error} label={label}>
			<select
				onChange={({ target: { value } }) => onChange(value)}
				required={required}
				value={value ?? ""}
			>
				<option disabled value="">
					Select here
				</option>
				{choices?.map(({ name, value }) => (
					<option key={value} value={value}>
						{name}
					</option>
				))}
			</select>
		</FormControl>
	);
}

export default Select;
