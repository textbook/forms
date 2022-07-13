function Text({ label, onChange, value }) {
	return (
		<label>
			<b>{label}*</b>
			<input
				onChange={({ target: { value } }) => onChange(value)}
				required
				type="text"
				value={value ?? ""}
			/>
		</label>
	);
}

export default Text;
