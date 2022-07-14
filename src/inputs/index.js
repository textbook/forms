import Email from "./Email";
import PhoneNumber from "./PhoneNumber";
import Select from "./Select";
import Text from "./Text";
import TextArea from "./TextArea";

export default function getInput(type) {
	switch (type) {
		case "email":
			return Email;
		case "select":
			return Select;
		case "tel":
			return PhoneNumber;
		case "textarea":
			return TextArea;
		default:
			return Text;
	}
}
