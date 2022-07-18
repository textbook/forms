import "./FormControl.scss";

function FormControl({ children, error, description, label, postfix = false }) {
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
		<div className={error && "error"}>
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
				{error && <span>{error}</span>}
			</label>
		</div>
	);
}

export default FormControl;
