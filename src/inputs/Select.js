function Select({ choices, label, onChange, value }) {
	return (
		<label>
			<b>{label}*</b>
			<select
				onChange={({ target: { value } }) => onChange(value)}
				required
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
