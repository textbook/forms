function Email({ label, onChange, required, value }) {
	return (
		<label>
			<b>{label}</b>
			<input
				autoComplete="email"
				onChange={({ target: { value } }) => onChange(value)}
				required={required}
				spellCheck={false}
				type="email"
				value={value ?? ""}
			/>
		</label>
	);
}

export default Email;
