import { useState } from "react";

function App() {
	const [firstName, setFirstName] = useState("");

	const submitForm = (event) => {
		event.preventDefault();
		fetch("/volunteer", {
			body: JSON.stringify({ firstName }),
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
			<button type="submit">Submit</button>
		</form>
	);
}

export default App;
