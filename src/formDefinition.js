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
	{
		choices: [
			"Employer",
			"Search engine",
			"Colleague or friend",
			"Conference",
			"Social media",
			"News article",
			"Blog post",
			"Other",
		],
		field: "hearAboutCYF",
		label: "Where did you hear about us?",
		type: "select",
	},
	{
		field: "employer",
		label: "Employer name",
		type: "text",
	},
];

export default formDefinition;
