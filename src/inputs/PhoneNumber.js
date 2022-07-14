import Text from "./Text";

function PhoneNumber(props) {
	return (
		<Text
			inputProps={{
				autoComplete: "tel",
				type: "tel",
			}}
			{...props}
		/>
	);
}

export default PhoneNumber;
