function PhoneNumber({ label, onChange, required, value }) {
	return (
		<label>
			<b>{label}</b>
			<input
				autoComplete="tel"
				onChange={({ target: { value } }) => onChange(value)}
				required={required}
				type="tel"
				value={value ?? ""}
			/>
		</label>
	);
}

export default PhoneNumber;
