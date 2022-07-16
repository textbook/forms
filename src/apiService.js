const API = process.env.REACT_APP_API ?? "";

export const getCities = async () => {
	const res = await fetch(`${API}/cities`);
	if (!res.ok) {
		throw new Error(res.statusText);
	}
	const { cities } = await res.json();
	return cities
		.filter(({ visibleIn }) => visibleIn.includes("VOLUNTEER_FORM"))
		.map(({ _id, name }) => ({ name, value: _id }))
		.sort(alphabeticalBy("name"));
};

export const postVolunteer = async (data) => {
	const res = await fetch(`${API}/volunteer`, {
		body: JSON.stringify(data),
		headers: { "Content-Type": "application/json" },
		method: "POST",
	});
	if (!res.ok) {
		throw new Error(res.statusText);
	}
};

function alphabeticalBy(property) {
	return (first, second) => {
		if (first[property] === second[property]) {
			return 0;
		}
		return first[property] > second[property] ? 1 : -1;
	};
}
