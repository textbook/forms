import * as cityService from "./cityService";

const formDefinition = [
	{
		field: "firstName",
		label: "First name",
		type: "text",
	},
	{
		field: "lastName",
		label: "Last name",
		type: "text",
	},
	{
		choices: () => cityService.getAll(),
		field: "cityName",
		label: "What Code Your Future city do you want to work with?",
		type: "select",
	},
];

export default formDefinition;
