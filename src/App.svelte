<script lang="ts">
	import { onMount } from "svelte";
	import Footer from "./Footer.svelte";
	import Turtle from "./Turtle.svelte";
	import Sidepanel from "./Sidepanel.svelte";
	import {
		turtleInput,
		turtleIter,
		svgStrokeColor,
		svgStrokeWidth,
		turnAngle,
	} from "./stores";

	let formula = "";
	let iters = 1;
	let turtleScale = 1;
	let turtleOriginX = 0;
	let turtleOriginY = 0;

	$: if (formula.length === 0) {
		turtleInput.update((t) => formula);
	}

	$: turtleIter.update((t) => iters);

	// When the component is mounted, set enableTransition to true
	// This will trigger the animation
	onMount(() => {
		// Parse the URL to extract the state from it
		if (location.hash.length > 1) {
			let stateParams = window.atob(location.hash.slice(1)).split("|"); //base64 decode

			// Set the state
			console.log(stateParams);
			$turtleInput = stateParams[0];
			formula = stateParams[0];
			$turtleIter = parseInt(stateParams[1]);
			iters = parseInt(stateParams[1]);
			$turnAngle = parseInt(stateParams[2]);
			$svgStrokeColor = stateParams[3];
			$svgStrokeWidth = parseFloat(stateParams[4]);
			turtleScale = parseFloat(stateParams[5]);
			turtleOriginX = parseFloat(stateParams[6]);
			turtleOriginY = parseFloat(stateParams[7]);
		}
	});

	function handleInput(event: KeyboardEvent) {
		// When the Enter key is pressed, update the store
		if (event.defaultPrevented) {
			return;
		}

		if (event.key !== undefined) {
			if (event.key === "Enter") {
				turtleInput.update((t) => formula);
			}
		}
	}
</script>

<main class="flex-grow self-center">
	<Sidepanel />
	<h1 class="py-2">L systems</h1>
	<div>
		<p>An Interactive Fractal Generator</p>
		<br />
		<div class="flex" id="turtle-inputs">
			<input
				title="Turtle Formula Input"
				type="text"
				placeholder="System:"
				class="transition-colors duration-100 ease-in-out bg-white shadow-md
          focus:outline-0 border border-transparent placeholder-gray-600
          rounded-md py-2 px-4 block w-5/6 mr-1 appearance-none leading-tight
          ds-input text-center"
				on:keypress={handleInput}
				bind:value={formula}
				aria-label="Turtle Formula Input"
			/>
			<input
				title="Formula Iterations"
				type="number"
				min="1"
				max="8"
				class="transition-colors duration-100 ease-in-out bg-white shadow-md
          focus:outline-0 border border-transparent placeholder-gray-600
          rounded-md py-2 px-2 block w-1/6 appearance-none leading-tight
          ds-input text-center"
				bind:value={iters}
				aria-label="Formula Iterations"
			/>
		</div>
		<Turtle
			svgScale={turtleScale}
			originX={turtleOriginX}
			originY={turtleOriginY}
		/>
		<input
			title="Turtle SVG Scaler"
			type="range"
			min="0.01"
			max="10"
			step="0.05"
			bind:value={turtleScale}
		/>
	</div>
</main>
<Footer />

<style>
	p {
		font-size: 1.5em;
	}

	h1 {
		color: #ff3e00;
		font-family: "Oleo Script Swash Caps", cursive;
		font-style: italic;
		font-size: 4em;
		font-weight: 100;
		line-height: normal;
	}

	/* Media Query - this only fires when the condition is met */
	@media (max-width: 640px) {
		p {
			font-size: 1em;
		}
		h1 {
			font-size: 3em;
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
		}

		main {
			width: 80%;
			max-width: 400px;
		}

		#turtle-inputs {
			flex-direction: column;
		}

		#turtle-inputs input[type="text"] {
			width: 100%;
			margin-bottom: 0.25rem;
		}
	}

	input[type="range"] {
		background-color: transparent;
	}

	input[type="range"]:hover {
		cursor: pointer;
	}

	/* main {
    width: 100%;
    max-width: 400px;
  } */
</style>
