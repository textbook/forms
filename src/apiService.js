const API = process.env.REACT_APP_API ?? "";

export const getCities = async () => {
	const res = await fetch(`${API}/cities`);
	if (!res.ok) {
		throw new Error(res.statusText);
	}
	const { cities } = await res.json();
	return cities
		.filter(({ visibleIn }) => visibleIn.includes("VOLUNTEER_FORM"))
		.map(({ name }) => name);
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
