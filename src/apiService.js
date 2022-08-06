const API = window.config?.API_URL ?? "";

export const getCities = async () => {
	const res = await fetch(`${API}/cities`);
	if (!res.ok) {
		throw new Error("Could not fetch city list");
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
		const { error } = await res.json();
		throw new Error(error);
	}
};

function alphabeticalBy(property) {
	return (first, second) => first[property]?.localeCompare(second[property]);
}
