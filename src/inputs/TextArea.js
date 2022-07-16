import FormControl from "./FormControl";

function TextArea({
	description,
	inputProps,
	label,
	onChange,
	required,
	value,
}) {
	return (
		<FormControl description={description} label={label}>
			<div>
				<textarea
					cols={30}
					onChange={({ target: { value } }) => onChange(value)}
					required={required}
					rows={5}
					value={value ?? ""}
					{...inputProps}
				/>
			</div>
		</FormControl>
	);
}

export default TextArea;
