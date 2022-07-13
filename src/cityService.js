export const getAll = async () => {
	const res = await fetch("/cities");
	if (!res.ok) {
		throw new Error(res.statusText);
	}
	const { cities } = await res.json();
	return cities
		.filter(({ visibleIn }) => visibleIn.includes("VOLUNTEER_FORM"))
		.map(({ name }) => name);
};
