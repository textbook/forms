import FormControl from "./FormControl";

function Checkbox({ description, error, label, onChange, required, value }) {
	return (
		<FormControl
			description={description}
			error={error}
			label={label}
			postfix={true}
		>
			<input
				checked={!!value}
				className={error ? "error" : ""}
				onChange={() => onChange(!value)}
				required={required}
				type="checkbox"
			/>
		</FormControl>
	);
}

export default Checkbox;
