import FormControl from "./FormControl";

function Text({ description, inputProps, label, onChange, required, value }) {
	return (
		<FormControl description={description} label={label}>
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
