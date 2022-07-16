import { useState } from "react";

import Checkbox from "./Checkbox";

const levels = ["Some", "Professional experience"];

function Skill({ experience, name, onChange, skill }) {
	const [expanded, setExpanded] = useState(false);
	return (
		<div>
			<Checkbox
				label={name}
				onChange={() => {
					if (expanded) {
						onChange(undefined);
					}
					setExpanded(!expanded);
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
									checked={experience === level}
									name={skill}
									onChange={() => onChange(level)}
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
}

function Skillset({ choices, label, onChange, value }) {
	return (
		<div>
			<h3 dangerouslySetInnerHTML={{ __html: label }} />
			{choices?.map((choice) => {
				const { name, value: skill } = choice;
				const previousExperience = value?.find(
					({ name }) => skill === name,
				)?.level;
				return (
					<Skill
						experience={previousExperience}
						key={skill}
						name={name}
						onChange={(newExperience) => {
							if (!newExperience) {
								onChange(value?.filter(({ name }) => name !== skill));
							} else if (previousExperience) {
								onChange(
									value.map((item) =>
										item.name === skill
											? { ...item, level: newExperience }
											: item,
									),
								);
							} else {
								onChange([
									...(value ?? []),
									{ level: newExperience, name: skill },
								]);
							}
						}}
						skill={skill}
					/>
				);
			})}
		</div>
	);
}

export default Skillset;
