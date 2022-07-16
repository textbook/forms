import * as apiService from "./apiService";

/**
 * Defines the form fields shown to the user.
 *
 * @typedef {
 *   | "checkbox"
 *   | "email"
 *   | "select"
 *   | "skillset"
 *   | "tel"
 *   | "text"
 *   | "textarea"
 * } FieldType - see mapping to components in ./inputs/index.js
 * @typedef {
 *   | string
 *   | { name: string, value: string }
 * } Choice - either a simple string or an object with separate name and value
 * @typedef {
 *   | Choice[]
 *   | (() => Choice[] | Promise<Choice[]>)
 * } Choices - either an array of the choices, or a provider function
 * @typedef {
 *   | boolean
 *   | ((data: any) => boolean)
 * } Required - whether it's required, or a function determining this from the current input data
 *
 * @typedef {Object} Field
 * @property {Choices=} choices - choices to show in e.g. select
 * @property {string=} description - extra description to show to the user
 * @property {string} field - the field name to use in the JSON payload
 * @property {string} label - the label to display to the user
 * @property {Required} required - whether this input is required
 * @property {FieldType} type - which type of control to show
 *
 * @type {Field[]}
 */
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
		field: "cityId",
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
		choices: [
			{ name: "Node", value: "NodeJS" },
			{ name: "React", value: "ReactJS" },
			{ name: "SQL", value: "Databases" },
		],
		field: "techSkill",
		label: "Teach people coding or UX",
		required: false,
		type: "skillset",
	},
	{
		field: "agreeToTOU",
		label: [
			"Yes, I have read and accepted the",
			'<a href="https://codeyourfuture.io/terms/">terms of use</a>',
			"and",
			'<a href="https://codeyourfuture.io/privacy-policy/">privacy policy</a>',
		].join(" "),
		required: true,
		type: "checkbox",
	},
];

export default formDefinition;
