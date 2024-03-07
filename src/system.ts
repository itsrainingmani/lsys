export class LSystem {
	rule_map: { string: string };

	constructor(formula: string) {
		if (!formula.includes(":")) {
			throw Error("Formula is invalid");
		}

		formula.split(";").forEach((rule) => {
			let f = rule.split(":");
			if (f.length > 2) {
				throw Error("Invalid Rule");
			}

			let [symbol, rewrite_rule] = f;
			this.rule_map[symbol] = rewrite_rule;
		});
	}

	rewrite(num_iters: number) {}
}

class Turtle {
	context: CanvasRenderingContext2D;
	x: number;
	y: number;
	system: LSystem;

	constructor(
		context: CanvasRenderingContext2D,
		x: number,
		y: number,
		system: LSystem
	) {
		this.context = context;
		this.x = x;
		this.y = y;
		this.system = system;
	}
}
