import { useEffect, useState } from "react";

import Checkbox from "./Checkbox";

const levels = ["Some", "Professional experience"];

function Skillset({ choices, label, onChange, value }) {
	const [expandedSkills, setExpandedSkills] = useState({});

	useEffect(() => {
		setExpandedSkills(
			choices.reduce(
				(expanded, { value: skill }) => ({
					...expanded,
					[skill]: levels.includes(
						value?.find(({ name }) => skill === name)?.level,
					),
				}),
				{},
			),
		);
	}, [choices, value]);

	return (
		<div>
			<h3 dangerouslySetInnerHTML={{ __html: label }} />
			{choices.map((choice) => {
				const { name, value: skill } = choice;
				const anyExperience = value?.find(({ name }) => skill === name)?.level;
				const expanded = expandedSkills[skill];
				return (
					<div key={skill}>
						<Checkbox
							label={name}
							onChange={() => {
								if (expanded) {
									// remove item from array when collapsing skill
									onChange(value?.filter(({ name }) => name !== skill));
								} else {
									setExpandedSkills({ ...expandedSkills, [skill]: true });
								}
							}}
							value={expanded}
						/>
						{expanded && (
							<fieldset>
								<legend>Level of experience</legend>
								{levels.map((level) => (
									<div key={level}>
										<label>
											<input
												checked={anyExperience === level}
												name={skill}
												onChange={() => {
													if (anyExperience) {
														// update item in array when changing level
														onChange(
															value.map((item) =>
																item.name === skill ? { ...item, level } : item,
															),
														);
													} else {
														// add item to array when setting initial level
														onChange([
															...(value ?? []),
															{ level, name: skill },
														]);
													}
												}}
												required
												type="radio"
												value={level}
											/>
											{level}
										</label>
									</div>
								))}
							</fieldset>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default Skillset;
