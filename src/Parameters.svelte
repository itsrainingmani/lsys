<script lang="ts">
	import { createCollapsible, melt } from "@melt-ui/svelte";
	// import { ChevronsUpDown, X } from "$icons/index.js";
	import { slide } from "svelte/transition";
	import { strokeColor, turnAngle, strokeWidth } from "./stores.js";

	const {
		elements: { root, content, trigger },
		states: { open },
	} = createCollapsible({
		forceVisible: true,
	});
</script>

<div
	use:melt={$root}
	class="sidepanel fixed mx-auto mb-28 w-[18rem] max-w-full sm:w-[25rem]"
>
	<div class="flex items-center justify-between">
		<span class="text-sm font-semibold text-magnum-900"> Parameters </span>
		<button
			use:melt={$trigger}
			class="relative h-6 w-6 place-items-center rounded-md bg-white text-sm text-magnum-800 shadow hover:opacity-75 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-75"
			aria-label="Toggle"
		>
			<div class="abs-center">
				{#if $open}
					<p class="size-4">X</p>
				{:else}
					<p class="size-4">^</p>
				{/if}
			</div>
		</button>
	</div>

	<div class="my-2 rounded-lg bg-white p-3 shadow">
		<div class="flex justify-between">
			<label for="stroke-color" class="text-gray-800 px-2">
				Stroke Color
			</label>
			<input
				name="stroke-color"
				title="Stroke Color Picker"
				type="color"
				class="transition-colors duration-100 ease-in-out bg-white shadow-md focus:outline-0 border border-transparent rounded-md py-2 px-2 block w-2/6 appearance-none leading-tight ds-input text-center self-center mr-2"
				aria-label="Stroke Color Picker"
				bind:value={$strokeColor}
			/>
		</div>
	</div>

	<div
		style:position="absolute"
		style:top="calc(100% + 10px)"
		style:right="0"
		style:left="0"
	>
		{#if $open}
			<div use:melt={$content} transition:slide>
				<div class="flex flex-col gap-2">
					<div class="rounded-lg bg-white p-3 shadow">
						<div class="flex justify-between">
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
								class="transition-colors duration-100 ease-in-out bg-white shadow-md focus:outline-0 border border-transparent rounded-md px-2 block w-2/6 appearance-none leading-tight ds-input text-center self-center mr-2"
								aria-label="Stroke Width Picker"
								bind:value={$strokeWidth}
							/>
						</div>
					</div>
					<div class="rounded-lg bg-white p-3 shadow">
						<div class="flex justify-between">
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
								class="transition-colors duration-100 ease-in-out bg-white shadow-md focus:outline-0 border border-transparent rounded-md block w-2/6 appearance-none leading-tight ds-input text-center self-center mr-2"
								aria-label="Angle Select"
								bind:value={$turnAngle}
							/>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.sidepanel {
		z-index: 1; /* Stay on top */
		top: 0;
		right: 0;
	}
	.abs-center {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
