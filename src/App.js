import { useState } from "react";

function App() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const submitForm = (event) => {
		event.preventDefault();
		fetch("/volunteer", {
			body: JSON.stringify({ firstName, lastName }),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		});
	};

	return (
		<form onSubmit={submitForm}>
			<label>
				First Name
				<input
					onChange={({ target: { value } }) => setFirstName(value)}
					required
					type="text"
					value={firstName}
				/>
			</label>
			<label>
				Last Name
				<input
					onChange={({ target: { value } }) => setLastName(value)}
					required
					type="text"
					value={lastName}
				/>
			</label>
			<button type="submit">Submit</button>
		</form>
	);
}

export default App;
