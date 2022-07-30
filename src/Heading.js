function Heading({ description, hr, label }) {
	return (
		<>
			{hr === "before" && <hr />}
			{label && <h2 dangerouslySetInnerHTML={{ __html: label }} />}
			{description && <p dangerouslySetInnerHTML={{ __html: description }} />}
			{hr === "after" && <hr />}
		</>
	);
}

export default Heading;
