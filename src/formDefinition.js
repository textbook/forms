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
		label: "Which Code Your Future location is near to you?",
		type: "select",
	},
];

export default formDefinition;
