function Text({ description, inputProps, label, onChange, required, value }) {
	return (
		<label>
			<b>{label}</b>
			{description && <span>{description}</span>}
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
