import { useEffect, useState } from "react";

import Checkbox from "./Checkbox";

const levels = ["Some", "Professional experience"];

function Skillset({ choices, label, onChange, value }) {
	const [expanded, setExpanded] = useState([]);

	useEffect(() => {
		setExpanded(
			choices.map((choice) => {
				const skill = typeof choice === "string" ? choice : choice.value;
				return levels.includes(
					value?.find(({ name }) => skill === name)?.level,
				);
			}),
		);
	}, [choices, value]);

	return (
		<div>
			<h3 dangerouslySetInnerHTML={{ __html: label }} />
			{choices.map((choice, index) => {
				let name, skill;
				if (typeof choice === "string") {
					name = choice;
					skill = choice;
				} else {
					({ name, value: skill } = choice);
				}
				const selected = value?.find(({ name }) => skill === name)?.level;
				return (
					<div key={skill}>
						<Checkbox
							label={name}
							onChange={() => {
								if (expanded[index]) {
									onChange(value?.filter(({ name }) => name !== skill));
								}
								setExpanded(
									expanded.map((val, idx) => (idx === index ? !val : val)),
								);
							}}
							value={expanded[index]}
						/>
						{expanded[index] && (
							<fieldset>
								<legend>Level of experience</legend>
								{levels.map((level) => (
									<div key={level}>
										<label>
											<input
												checked={selected === level}
												name={skill}
												onChange={() => {
													if (selected) {
														onChange(
															value.map((item) =>
																item.name === skill ? { ...item, level } : item,
															),
														);
													} else {
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
