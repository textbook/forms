import FormControl from "./FormControl";

function Text({
	description,
	error,
	inputProps,
	label,
	onChange,
	required,
	value,
}) {
	return (
		<FormControl description={description} error={error} label={label}>
			<input
				onChange={({ target: { value } }) => onChange(value)}
				required={required}
				type="text"
				value={value ?? ""}
				{...inputProps}
			/>
		</FormControl>
	);
}

export default Text;
