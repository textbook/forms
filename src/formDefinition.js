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
		field: "email",
		label: "Email",
		required: true,
		type: "email",
	},
	{
		choices: () => apiService.getCities(),
		field: "cityName",
		label: "Which Code Your Future location is near to you?",
		required: true,
		type: "select",
	},
	{
		field: "tel",
		label: "Phone number",
		required: true,
		type: "tel",
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
	{
		description: [
			"This will help us get to know you a little better.",
			"One or two sentences are perfect, thank you.",
		].join(" "),
		field: "interestedInCYF",
		label: "Why do you want to volunteer with Code Your Future?",
		required: true,
		type: "textarea",
	},
	{
		field: "agreeToTOU",
		label: "Yes, I have read and accepted the terms of use and privacy policy",
		required: true,
		type: "checkbox",
	},
];

export default formDefinition;
