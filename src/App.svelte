<script lang="ts">
import { onMount } from "svelte";
import Footer from "./Footer.svelte";
import Turtle from "./Turtle.svelte";
import Sidepanel from "./Sidepanel.svelte";
import {
	turtleInput,
	systemIter,
	strokeColor,
	strokeWidth,
	turnAngle,
} from "./stores";

let formula = "";
let iters = 1;

turtleInput.subscribe((t) => {
	formula = t;
});

$: if (formula.length === 0) {
	turtleInput.update((t) => formula);
}

$: systemIter.update((t) => iters);

// When the component is mounted, set enableTransition to true
// This will trigger the animation
onMount(() => {
	// Parse the URL to extract the state from it
	if (location.hash.length > 1) {
		const stateParams = window.atob(location.hash.slice(1)).split("|"); //base64 decode

		// Set the state
		console.log(stateParams);
		$turtleInput = stateParams[0];
		formula = stateParams[0];
		$systemIter = Number.parseInt(stateParams[1]);
		iters = Number.parseInt(stateParams[1]);
		$turnAngle = Number.parseInt(stateParams[2]);
		$strokeColor = stateParams[3];
		$strokeWidth = Number.parseFloat(stateParams[4]);
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

<main class="flex-grow self-center relative z-10 min-h-full w-full">
	<Sidepanel />
	<div class="flex flex-row items-center justify-start w-full">
		<h1 class="text-left px-4">L systems</h1>
		<section>
			<div class="flex w-full" id="turtle-inputs">
				<input
					title="Turtle Formula Input"
					type="text"
					placeholder="Rules:"
					class="transition-colors w-full duration-100 ease-in-out bg-white shadow-md focus:outline-0 border border-transparent placeholder-gray-600 rounded-md py-2 px-4 block mr-1 appearance-none leading-tight ds-input text-center"
					on:keypress={handleInput}
					bind:value={formula}
					aria-label="Turtle Formula Input"
				/>
				<input
					title="Formula Iterations"
					type="number"
					min="1"
					max="15"
					class="transition-colors duration-100 ease-in-out bg-white shadow-md focus:outline-0 border border-transparent placeholder-gray-600 rounded-md py-2 px-2 block w-2/6 appearance-none leading-tight ds-input text-center"
					bind:value={iters}
					aria-label="Formula Iterations"
				/>
			</div>
		</section>
	</div>
	<Turtle />
</main>
<Footer />

<style>
	h1 {
		color: #ff3e00;
		font-family: "Oleo Script Swash Caps", cursive;
		font-style: italic;
		font-size: 2em;
		font-weight: 100;
		line-height: normal;
	}
	p {
		font-size: 1.5em;
	}

	/* Media Query - this only fires when the condition is met */
	/* @media (max-width: 640px) {
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
	} */

	input[type="range"] {
		background-color: transparent;
	}

	input[type="range"]:hover {
		cursor: pointer;
	}
</style>
