function FormControl({ children, description, label }) {
	return (
		<label>
			<b dangerouslySetInnerHTML={{ __html: label }} />
			{description && (
				<span dangerouslySetInnerHTML={{ __html: description }} />
			)}
			{children}
		</label>
	);
}

export default FormControl;
