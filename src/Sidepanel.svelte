<script lang="ts">
	import { fly, fade } from "svelte/transition";
	import { quintOut } from "svelte/easing";
	import { strokeColor, turnAngle, strokeWidth } from "./stores.js";

	// let visible = false;

	let angles = [15, 30, 45, 60, 90];
</script>

<!-- {#if visible} -->
<div id="sidepanel" class="sidepanel fixed shadow">
	<p class="text-gray-800 text-center my-2 font-bold text-xl">Parameters</p>
	<!-- <button type="button" class="closebtn" on:click={() => (visible = false)}>
		&times;
	</button> -->
	<div class="flex flex-col">
		<div class="flex justify-between my-2">
			<label for="stroke-color" class="text-gray-800 px-2">
				Stroke Color
			</label>
			<input
				name="stroke-color"
				title="Stroke Color Picker"
				type="color"
				class="transition-colors duration-100 ease-in-out bg-white shadow-md
          focus:outline-0 border border-transparent rounded-md py-2 px-2 block
          w-2/6 appearance-none leading-tight ds-input text-center self-center
          mr-2"
				bind:value={$strokeColor}
				aria-label="Stroke Color Picker"
			/>
		</div>
		<div class="flex justify-between my-2">
			<label for="stroke-width" class="text-gray-800 px-2">
				Stroke Width
			</label>
			<input
				name="stroke-width"
				title="Stroke Width"
				type="number"
				min="0.1"
				max="1"
				step="0.1"
				class="transition-colors duration-100 ease-in-out bg-white shadow-md
          focus:outline-0 border border-transparent rounded-md px-2 block w-2/6
          appearance-none leading-tight ds-input text-center self-center mr-2"
				bind:value={$strokeWidth}
				aria-label="Stroke Width Picker"
			/>
		</div>
		<div class="flex justify-between my-2">
			<label for="angle-selector" class="text-gray-800 px-2">
				Turn Angle
			</label>
			<input
				name="angle-selector"
				title="Angle Selector"
				type="number"
				min="10"
				max="120"
				step="5"
				class="transition-colors duration-100 ease-in-out bg-white shadow-md
          focus:outline-0 border border-transparent rounded-md block w-2/6
          appearance-none leading-tight ds-input text-center self-center mr-2"
				bind:value={$turnAngle}
				aria-label="Angle Select"
			/>
		</div>
	</div>
</div>
<!-- {/if} -->

<button
	class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border
  border-gray-400 rounded shadow"
>
	&#9776;
</button>

<style>
	.sidepanel {
		background-color: #f8fcff;
		/* height: 100%; Specify a height */
		width: auto; /* 0 width - change this with JavaScript */
		z-index: 1; /* Stay on top */
		top: 0;
		right: 0;
		overflow-x: hidden; /* Disable horizontal scroll */
	}

	@media (max-width: 640px) {
		.sidepanel {
			width: 100%;
		}
	}

	button {
		position: fixed;
		top: 5px;
		right: 5px;
	}
</style>
