import { useEffect, useState } from "react";

import * as apiService from "./apiService";
import formDefinition from "./formDefinition";
import Form from "./Form";

function App() {
	const [form, setForm] = useState();
	const [data, setData] = useState({});

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
		apiService.postVolunteer(data);
	};

	if (!form) {
		return null;
	}

	return (
		<Form
			data={data}
			formDefinition={form}
			onChange={({ field, value }) => setData({ ...data, [field]: value })}
			onSubmit={submitForm}
		/>
	);
}

export default App;
