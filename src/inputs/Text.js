function Text({ inputProps, label, onChange, required, value }) {
	return (
		<label>
			<b>{label}</b>
			<input
				onChange={({ target: { value } }) => onChange(value)}
				required={required}
				type="text"
				value={value ?? ""}
				{...inputProps}
			/>
		</label>
	);
}

export default Text;
