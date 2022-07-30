import { useEffect, useState } from "react";

import * as apiService from "./apiService";
import formDefinition from "./formDefinition";
import Form from "./Form";
import Header from "./Header";

function App() {
	const [data, setData] = useState({});
	const [errors, setErrors] = useState({});
	const [form, setForm] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		Promise.all(
			formDefinition.map(async (field) => {
				if (typeof field.choices === "function") {
					return {
						...field,
						choices: await field.choices(),
					};
				}
				return field;
			}),
		).then((definition) => setForm(definition));
	}, []);

	const submitForm = (event) => {
		event.preventDefault();
		setErrors({});
		setLoading(true);
		apiService
			.postVolunteer(data)
			.catch((err) => {
				if (err.message === "EMAIL_EXIST") {
					setErrors((existingErrors) => ({
						...existingErrors,
						email: "An account with this email address already exists",
					}));
				}
			})
			.finally(() => setLoading(false));
	};

	return (
		<>
			<Header />
			{form && (
				<form onSubmit={submitForm}>
					<Form
						data={data}
						errors={errors}
						formDefinition={form}
						onChange={({ field, value }) =>
							setData((previousData) => ({ ...previousData, [field]: value }))
						}
						onSubmit={submitForm}
					/>
					<button disabled={loading} type="submit">
						Submit
					</button>
				</form>
			)}
		</>
	);
}

export default App;
