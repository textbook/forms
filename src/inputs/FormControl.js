function FormControl({ children, description, label }) {
	return (
		<div>
			<label>
				<b dangerouslySetInnerHTML={{ __html: label }} />
				{description && (
					<span dangerouslySetInnerHTML={{ __html: description }} />
				)}
				{children}
			</label>
		</div>
	);
}

export default FormControl;
