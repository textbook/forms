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
 *@typedef {
 *   | boolean
 *   | ((data: any) => boolean)
 *} Hidden - whether it's hidden, or a function determining this from the current input data
 *
 * @typedef {Object} Field
 * @property {Choices=} choices - choices to show in e.g. select
 * @property {string=} description - extra description to show to the user
 * @property {string} field - the field name to use in the JSON payload
 * @property {Hidden=} hidden - whether this input is hidden
 * @property {string} label - the label to display to the user
 * @property {Required} required - whether this input is required
 * @property {FieldType} type - which type of control to show
 *
 * @type {Field[]}
 */
const formDefinition = [
	{
		field: "firstName",
		label: "Given name",
		required: true,
		type: "text",
	},
	{
		field: "lastName",
		label: "Family name",
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
			"Consulting/ Business Services",
			"Creative",
			"Charities",
			"Education",
			"Engineering and Construction",
			"Financial Services, Banking and Insurance",
			"Government and Public Services",
			"Healthcare and Pharmaceutical",
			"Hospitality and Leisure",
			"Human Resources",
			"Legal",
			"Manufacturing",
			"Media and Entertainment",
			"Real Estate",
			"Retail and Consumer",
			"Technology",
			"Telecommunications",
			"Transport and Logistics",
			"Other",
		],
		field: "industry",
		label: "What industry are you in?",
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
		choices: ["Capgemini", "Other"],
		field: "employer",
		hidden: ({ hearAboutCYF }) => hearAboutCYF !== "Employer",
		label: "Employer name",
		required: true,
		type: "select",
	},
	{
		choices: ["Coaching / Mentoring ", "Help people learn public speaking"],
		field: "guidePeople",
		label: "A. Guide people",
		type: "skillset",
	},
	{
		choices: [
			{ name: "Node", value: "NodeJS" },
			{ name: "React", value: "ReactJS" },
			{ name: "SQL", value: "Databases" },
			"JavaScript",
			{ name: "HTML & CSS", value: "HTML, CSS" },
			{ name: "UI/UX designer", value: "UX Design" },
			"Other",
		],
		field: "techSkill",
		label: "B. Teach people coding or UX",
		type: "skillset",
	},
	{
		choices: [
			"Blogging / Writing",
			"Photography / Videography",
			"Growth Marketing / Social Media Strategy",
			"Speaking to NGOs and corporate partners",
			"Accounting / Bookkeeping",
			"Business Analysis",
			"Project Management",
			"Help with job search / CV & interview prep",
			"Running events",
			"Pedagogy / Learning Environments",
			"Other",
		],
		field: "otherSkill",
		label: "C. Help run Code Your Future",
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
	{
		field: "agreeToReceiveCommunication",
		label: "Yes, contact me about volunteering activities and related events",
		required: true,
		type: "checkbox",
	},
];

export default formDefinition;
