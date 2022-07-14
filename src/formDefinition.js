import * as apiService from "./apiService";

const formDefinition = [
	{
		field: "firstName",
		label: "First name",
		required: true,
		type: "text",
	},
	{
		field: "lastName",
		label: "Last name",
		required: true,
		type: "text",
	},
	{
		choices: () => apiService.getCities(),
		field: "cityName",
		label: "Which Code Your Future location is near to you?",
		required: true,
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
		required: true,
		type: "select",
	},
	{
		field: "employer",
		label: "Employer name",
		required: ({ hearAboutCYF }) => hearAboutCYF === "Employer",
		type: "text",
	},
];

export default formDefinition;
