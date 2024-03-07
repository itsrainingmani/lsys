/** typewriter
 * Function that performs a typewriter animation on a given node.
 * the node has to have a value object to operate on
 * the default speed is 100
 */
export const typewriter = (node: { value: any }, { speed = 100 }: any) => {
	console.log(speed);
	const text = node.value;
	const duration = text.length * speed;

	return {
		duration,
		tick: (t: number) => {
			const i = ~~(text.length * t);
			node.value = text.slice(0, i);
		},
	};
};

// The input sequence has the following format:
// formula,rule1:output1,rule2:output2,...,ruleN:outputN
export const transformSequence = (formula: string, iters: number) => {
	let seq = formula.trim().split(",");
	if (seq.length === 0) {
		return "";
	} else if (seq.length === 1) {
		return seq[0];
	}
	let cmds = seq.shift(); // these are the basic cmds
	let rules: { [id: string]: string } = {};

	// Create a mapping of rules to their outputs
	// There can't be more than one output for a rule
	for (const rule of seq) {
		let r = rule.split(":");
		rules[r[0]] = r[1];
	}
	let transformed = "";
	let new_cmds = cmds ?? "";

	for (let i = 0; i < iters; i++) {
		// Apply transformation
		for (let j = 0; j < new_cmds.length; j++) {
			if (rules[new_cmds[j]]) {
				transformed += rules[new_cmds[j]];
			} else {
				transformed += new_cmds[j];
			}
		}
		new_cmds = transformed;
		transformed = "";
	}

	return new_cmds;
};
