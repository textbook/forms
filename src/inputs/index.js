import Checkbox from "./Checkbox";
import Email from "./Email";
import PhoneNumber from "./PhoneNumber";
import Select from "./Select";
import Skillset from "./Skillset";
import Text from "./Text";
import TextArea from "./TextArea";

export default function getInput(type) {
	switch (type) {
		case "checkbox":
			return Checkbox;
		case "email":
			return Email;
		case "select":
			return Select;
		case "skillset":
			return Skillset;
		case "tel":
			return PhoneNumber;
		case "textarea":
			return TextArea;
		default:
			return Text;
	}
}
