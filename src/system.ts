export const DEG_TO_RAD = Math.PI / 180;

export class LSystem {
	rule_map: Map<string, string[]>;
	symbols: string[];
	axiom: string;

	// The system is formalized as so ->
	// Set(Symbols);Start;Production Rules,...
	// F,G;F;F:F+F+F,G:G+G+G
	constructor(system: string) {
		if (!system.includes(":")) {
			throw new Error("System is invalid");
		}
		this.rule_map = new Map();

		let [symbols, axiom, rewrite_rules] = system.trim().split(";");
		this.axiom = axiom;
		let symbol_list = new Set(symbols.replace(" ", "").split(","));
		this.symbols = [...symbol_list.keys()];

		rewrite_rules.split(",").forEach((rule) => {
			let f = rule.split(":");
			if (f.length > 2) {
				throw new Error("Invalid Rule");
			}

			let [symbol, rewrite_rule] = f;
			if (this.symbols.includes(symbol)) {
				this.rule_map.set(symbol, rewrite_rule.split(""));
			}
		});
	}

	rewrite(num_iters: number): string[] {
		// Start off with the axiom | start condition
		let transformed = this.axiom.split("");
		for (let i = 0; i < num_iters; i++) {
			// Apply transformation
			let substituted = transformed.flatMap((t) => {
				return this.rule_map.get(t) ?? [t];
			});
		}

		return transformed;
	}
}

export interface Pos {
	x: number;
	y: number;
}

export class DrawingContext {
	context: CanvasRenderingContext2D;
	width: number;
	height: number;

	constructor(
		context: CanvasRenderingContext2D,
		strokeColor = "blue",
		strokeWidth = 10
	) {
		this.context = context;
		this.context.strokeStyle = strokeColor;
		this.context.lineWidth = strokeWidth;
		this.width = this.context.canvas.width;
		this.height = this.context.canvas.height;

		this.context.clearRect(0, 0, this.width, this.height);
		this.context.imageSmoothingEnabled = false;
	}

	drawLine(start_pos: Pos, end_pos: Pos) {
		this.context.beginPath();
		this.context.moveTo(start_pos.x, start_pos.y);
		this.context.lineTo(end_pos.x, end_pos.y);
		this.context.stroke();
		this.context.closePath();
	}

	updateColor(strokeColor: string) {
		this.context.strokeStyle = strokeColor;
	}

	updateWidth(strokeWidth: number) {
		this.context.lineWidth = strokeWidth;
	}

	setup() {}
	scaleBy(scale_factor: number) {}
	pan(factor: number) {}
}

export class Turtle {
	context: DrawingContext;
	pos: Pos;
	moveAmt: number = 10;
	turnAngle: number;

	constructor(context: DrawingContext, start_pos: Pos, turnAngle = 45) {
		this.context = context;
		this.pos = start_pos;
		this.turnAngle = turnAngle;
	}

	moveForward(by?: number) {
		console.log(this.context.context);
		let end_pos = {
			x:
				this.pos.x +
				Math.sin(this.turnAngle * DEG_TO_RAD) * (by ?? this.moveAmt),
			y:
				this.pos.y +
				Math.cos(this.turnAngle * DEG_TO_RAD) * (by ?? this.moveAmt),
		};
		this.context.drawLine(this.pos, end_pos);
		this.pos = end_pos;
	}

	turn(by: number) {
		this.turnAngle += by;
	}
}
