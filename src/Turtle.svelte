<script lang="ts">
	import { DrawingContext, LSystem, Turtle, type Pos } from "./system";
	import {
		turtleInput,
		turtleIter,
		svgStrokeColor,
		turnAngle,
		svgStrokeWidth,
	} from "./stores";
	import { onMount } from "svelte";

	let ctx: CanvasRenderingContext2D | null = null;

	onMount(() => {
		const canvas = <HTMLCanvasElement>document.getElementById("turtle-canvas");
		ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
	});

	let formula_input = "";
	let num_iters = 1;
	let turn_amt = 45;
	let stroke_color = "#ff3e00";
	let stroke_width = 0.2;
	turtleInput.subscribe((value) => {
		formula_input = value;
	});

	turtleIter.subscribe((value) => {
		num_iters = value;
	});
	turnAngle.subscribe((value) => {
		turn_amt = value;
	});
	svgStrokeColor.subscribe((value) => {
		stroke_color = value;
	});
	svgStrokeWidth.subscribe((value) => {
		stroke_width = value;
	});

	$: if (formula_input.length > 0 && num_iters > 0 && ctx) {
		console.log(formula_input);
		const origin: Pos = {
			x: Math.round(ctx.canvas.width / 2),
			y: Math.round(ctx.canvas.height / 2),
		};
		let drawing_context = new DrawingContext(ctx, stroke_color, stroke_width);
		let lsys = new LSystem(formula_input);
		let turtle = new Turtle(drawing_context, origin, turn_amt);
		let current_system = lsys.rewrite(num_iters);
		type State = {
			pos: Pos;
			angle: number;
		};
		let saved_states: State[] = [];
		let loc: State = {
			pos: { x: 0, y: 0 },
			angle: 0,
		};
		for (let move of current_system) {
			let { pos, angle } = loc;
			if (move.match("[A-Z]")) {
				turtle.moveForward();
				loc.pos = turtle.pos;
			} else if (move.match("[a-z]")) {
				turtle.advance();
				loc.pos = turtle.pos;
			} else if (move === "+") {
				turtle.rotate(turn_amt);
				loc.angle = turtle.turnAngle;
			} else if (move === "-") {
				turtle.rotate(-turn_amt);
				loc.angle = turtle.turnAngle;
			} else if (move === "[") {
				saved_states.push({
					pos: { x: loc.pos.x, y: loc.pos.y },
					angle: angle,
				});
			} else if (move === "]") {
				let prev = saved_states.pop();
				if (prev) {
					loc = prev;
					turtle.pos = loc.pos;
					turtle.turnAngle = loc.angle;
				}
			}
		}
		// turtle.moveForward().rotate(45).moveForward();
	}
</script>

<div>
	<canvas
		class="absolute top-0 left-0 w-full h-full -z-10"
		id="turtle-canvas"
		width="800"
		height="800"
	>
		L-Systems Generated Output
	</canvas>
</div>

<style>
	canvas {
		/* border: 10px solid red; */
		background-color: #f8fcff;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23c6ddff' fill-opacity='0.6'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
	}
</style>
