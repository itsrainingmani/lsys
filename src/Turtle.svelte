<script lang="ts">
import InfiniteCanvas from "ef-infinite-canvas";
import { DrawingContext, LSystem, Turtle, type Pos } from "./system";
import {
	turtleInput,
	systemIter,
	strokeColor,
	turnAngle,
	strokeWidth,
} from "./stores";
import { onMount } from "svelte";

let ctx: CanvasRenderingContext2D | null = null;
let canvas: HTMLCanvasElement | null = null;
let infCanvas: any;

function drawTurtle(
	formula_input: string,
	num_iters: number,
	turn_amt: number,
	stroke_color: string,
	stroke_width: number,
) {
	if (ctx) {
		const origin: Pos = {
			x: Math.round(ctx.canvas.width / 2),
			y: Math.round(ctx.canvas.height / 2),
		};
		const drawing_context = new DrawingContext(ctx, stroke_color, stroke_width);
		drawing_context.clear();
		const lsys = new LSystem(formula_input);
		const turtle = new Turtle(drawing_context, origin, turn_amt);
		const current_system = lsys.rewrite(num_iters);
		type State = {
			pos: Pos;
			angle: number;
		};
		const saved_states: State[] = [];
		let loc: State = {
			pos: { x: 0, y: 0 },
			angle: 0,
		};
		for (const move of current_system) {
			const { pos, angle } = loc;
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
				const prev = saved_states.pop();
				if (prev) {
					loc = prev;
					turtle.pos = loc.pos;
					turtle.turnAngle = loc.angle;
				}
			}
		}
	}
}

// TODO: Remove the resize and maybe do dpi scaling here instead??
function canvasResize() {
	canvas = <HTMLCanvasElement>document.getElementById("turtle-canvas");
	if (infCanvas) {
		ctx?.clearRect(0, 0, infCanvas.width, infCanvas.height);
		console.log("before", infCanvas.width, infCanvas.height);
		infCanvas.width = window.innerWidth;
		infCanvas.height = window.innerHeight;
		console.log("after", infCanvas.width, infCanvas.height);
		drawTurtle(
			$turtleInput,
			$systemIter,
			$turnAngle,
			$strokeColor,
			$strokeWidth,
		);
	}
}

onMount(() => {
	canvas = <HTMLCanvasElement>document.getElementById("turtle-canvas");
	infCanvas = new InfiniteCanvas(canvas);
	ctx = <CanvasRenderingContext2D>infCanvas.getContext("2d");
	window.addEventListener("resize", canvasResize);
	// ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
});

$: if ($turtleInput.length > 0 && $systemIter > 0 && ctx) {
	drawTurtle($turtleInput, $systemIter, $turnAngle, $strokeColor, $strokeWidth);
}

// $: if ($turtleInput.length === 0) {
// 	infCanvas.clear();
// }
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
