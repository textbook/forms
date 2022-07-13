import * as apiService from "./apiService";

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
		choices: () => apiService.getCities(),
		field: "cityName",
		label: "What Code Your Future city do you want to work with?",
		type: "select",
	},
];

export default formDefinition;
