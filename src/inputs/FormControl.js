function FormControl({ children, description, label, postfix = false }) {
	function labelText() {
		return (
			<>
				<b dangerouslySetInnerHTML={{ __html: label }} />
				{description && (
					<span dangerouslySetInnerHTML={{ __html: description }} />
				)}
			</>
		);
	}
	return (
		<div>
			<label>
				{postfix ? (
					<>
						{children}
						{labelText()}
					</>
				) : (
					<>
						{labelText()}
						{children}
					</>
				)}
			</label>
		</div>
	);
}

export default FormControl;
