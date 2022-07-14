import Text from "./Text";

function Email(props) {
	return (
		<Text
			inputProps={{
				autoComplete: "email",
				spellCheck: false,
				type: "email",
			}}
			{...props}
		/>
	);
}

export default Email;
