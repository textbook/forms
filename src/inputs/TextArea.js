function TextArea({
	description,
	inputProps,
	label,
	onChange,
	required,
	value,
}) {
	return (
		<label>
			<b>{label}</b>
			{description && <span>{description}</span>}
			<textarea
				cols={30}
				onChange={({ target: { value } }) => onChange(value)}
				required={required}
				rows={5}
				value={value ?? ""}
				{...inputProps}
			/>
		</label>
	);
}

export default TextArea;
