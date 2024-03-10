<script lang="ts">
	import { DrawingContext, LSystem, Turtle, type Pos } from "./system";
	import Snackbar from "./Snackbar.svelte";
	import { transformSequence } from "./utils";
	import {
		turtleInput,
		turtleIter,
		svgStrokeColor,
		turnAngle,
		svgStrokeWidth,
	} from "./stores";
	import { onMount } from "svelte";

	let snackbarVis = false;
	let snackMsg = "Copied to Clipboard!";
	let ctx: CanvasRenderingContext2D | null = null;

	onMount(() => {
		const canvas = <HTMLCanvasElement>document.getElementById("turtle-canvas");
		ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
	});
	/** Only valid instructions are 'F', 'f', '-', '+'
	 * 'F' means move forward one unit and trace the path with a line.
	 * 'f' means move forward one unit but don't draw anything.
	 * '-' means rotate counter-clockwise but don't move.k
	 * '+' means rotate clockwise but don't move.
	 */

	const DEG_TO_RAD = Math.PI / 180;

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

	// $: turtleFormula = transformSequence(formula_input, num_iters);
	// function draw_system(
	// 	f: string,
	// 	turn_amt = 45,
	// 	move_amt = 2,
	// 	ctx: CanvasRenderingContext2D,
	// ) {
	// 	const width = ctx.canvas.width;
	// 	const height = ctx.canvas.height;
	// 	console.log(width, height);
	// 	console.log(ctx.canvas.clientWidth, ctx.canvas.clientHeight);
	// 	ctx.clearRect(0, 0, width, height);
	// 	const centerx = Math.round(width / 2);
	// 	const centery = Math.round(height / 2);
	// 	ctx.translate(centerx, centery);
	// 	ctx.strokeStyle = "blue";
	// 	ctx.beginPath();
	// 	ctx.moveTo(0, 0);
	// 	ctx.lineTo(100, 100);
	// 	ctx.stroke();
	// 	// ctx.fillRect(0, 0, 80, 80);
	// 	ctx.closePath();
	// 	// console.log(centerx, centery);
	// 	// ctx.fillRect(0, 0, 80, 90);
	// 	// let saved_states: { x: number; y: number; angle: number }[] = [];
	// 	// let loc = { x: 0, y: 0, angle: 0 };
	// 	// f.split("").forEach((t: string) => {
	// 	// 	let { x, y, angle } = loc;
	// 	// 	if ("ABCDEFGHIJabcdefghij".includes(t)) {
	// 	// 		ctx.beginPath();
	// 	// 		loc.x = x + Math.sin(angle * DEG_TO_RAD) * move_amt;
	// 	// 		loc.y = y - Math.cos(angle * DEG_TO_RAD) * move_amt;
	// 	// 		if ("ABCDEFGHIJ".includes(t)) {
	// 	// 			// ctx.moveTo(loc.x, loc.y);
	// 	// 			ctx.lineTo(loc.x, loc.y);
	// 	// 			ctx.stroke();
	// 	// 		}
	// 	// 		ctx.moveTo(loc.x, loc.y);
	// 	// 	} else if (t === "+") {
	// 	// 		loc.angle = (angle + turn_amt) % 360;
	// 	// 	} else if (t === "-") {
	// 	// 		loc.angle = (angle - turn_amt) % 360;
	// 	// 	} else if (t === "[") {
	// 	// 		saved_states.push({ x: x, y: y, angle: angle });
	// 	// 	} else if (t === "]") {
	// 	// 		let prev = saved_states.pop();
	// 	// 		if (prev) {
	// 	// 			ctx.beginPath();
	// 	// 			loc.x = prev.x;
	// 	// 			loc.y = prev.y;
	// 	// 			loc.angle = prev.angle;
	// 	// 			ctx.moveTo(loc.x, loc.y);
	// 	// 			ctx.stroke();
	// 	// 		}
	// 	// 	}
	// 	// });
	// 	ctx.closePath();
	// 	return ctx.canvas.textContent;
	// }

	$: if (formula_input.length > 0 && num_iters > 0 && ctx) {
		console.log(formula_input);
		const origin: Pos = {
			x: Math.round(ctx.canvas.width / 2),
			y: Math.round(ctx.canvas.height / 2),
		};
		let drawing_context = new DrawingContext(ctx, stroke_color, stroke_width);
		let lsys = new LSystem(formula_input);
		let turtle = new Turtle(drawing_context, origin, turn_amt);
		turtle.moveForward();
		turtle.turn(45);
		turtle.moveForward();
	}
</script>

<div>
	<canvas id="turtle-canvas" width="400" height="400">
		L-Systems Generated Output
	</canvas>
	{#if snackbarVis}
		<Snackbar message={snackMsg} />
	{/if}
</div>

<style>
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		/* border: 10px solid red; */
		background-color: #f8fcff;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23c6ddff' fill-opacity='0.6'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
	}
</style>
