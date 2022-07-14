function Text({ label, onChange, required, value }) {
	return (
		<label>
			<b>
				{label}
				{required && "*"}
			</b>
			<input
				onChange={({ target: { value } }) => onChange(value)}
				required={required}
				type="text"
				value={value ?? ""}
			/>
		</label>
	);
}

export default Text;
