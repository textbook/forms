import FormControl from "./FormControl";

function Checkbox({ description, label, onChange, required, value }) {
	return (
		<FormControl description={description} label={label} postfix={true}>
			<input
				checked={!!value}
				onChange={() => onChange(!value)}
				required={required}
				type="checkbox"
			/>
		</FormControl>
	);
}

export default Checkbox;
