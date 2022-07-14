function Checkbox({ description, label, onChange, required, value }) {
	return (
		<label>
			<b>{label}</b>
			{description && <span>{description}</span>}
			<input
				checked={!!value}
				onChange={() => onChange(!value)}
				required={required}
				type="checkbox"
			/>
		</label>
	);
}

export default Checkbox;
