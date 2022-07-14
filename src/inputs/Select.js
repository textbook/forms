function Select({ choices, label, onChange, required, value }) {
	return (
		<label>
			<b>
				{label}
				{required && "*"}
			</b>
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
		</label>
	);
}

export default Select;
