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
				{choices.map((choice) => (
					<option key={choice} value={choice}>
						{choice}
					</option>
				))}
			</select>
		</FormControl>
	);
}

export default Select;
