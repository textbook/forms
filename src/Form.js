import { Fragment } from "react";

import { Select, Text } from "./inputs";

function Form({ data, formDefinition, onChange, onSubmit }) {
	return (
		<form onSubmit={onSubmit}>
			{formDefinition.map(({ choices, field, label, type }) => (
				<Fragment key={field}>
					{(() => {
						switch (type) {
							case "select":
								return (
									<Select
										choices={choices}
										onChange={(value) => onChange({ field, value })}
										label={label}
										value={data[field]}
									/>
								);
							default:
								return (
									<Text
										label={label}
										onChange={(value) => onChange({ field, value })}
										value={data[field]}
									/>
								);
						}
					})()}
				</Fragment>
			))}
			<button type="submit">Submit</button>
		</form>
	);
}

export default Form;
