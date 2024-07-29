<script lang="ts">
import { createToaster, melt } from "@melt-ui/svelte";
import { flip } from "svelte/animate";
import { fly } from "svelte/transition";
import { X } from "lucide-svelte";
import {
	turtleInput,
	systemIter,
	strokeColor,
	strokeWidth,
	turnAngle,
} from "./stores.js";

type ToastData = {
	title: string;
	description: string;
	color: string;
};

const {
	elements: { content, title, description, close },
	helpers: { addToast },
	states: { toasts },
	actions: { portal },
} = createToaster<ToastData>();

const toastData: ToastData[] = [
	{
		title: "Success",
		description: "Fractal has been copied to your clipboard!",
		color: "bg-green-500",
	},
	{
		title: "Warning",
		description: "Please check again.",
		color: "bg-orange-500",
	},
	{
		title: "Status",
		description: "Fractal cleared!",
		color: "bg-red-500",
	},
];

function shareState() {
	const stateParams = [
		$turtleInput,
		$systemIter,
		$turnAngle,
		$strokeColor,
		$strokeWidth,
	].join("|");
	const shareable = `#${window.btoa(stateParams)}`;
	location.hash = shareable;
	if (!navigator.clipboard) {
		return;
	}
	navigator.clipboard
		.writeText(`${location.origin}/${shareable}`)
		.then(() => {
			addToast({
				data: toastData[0],
			});
		})
		.catch((err) => {
			console.log(err);
		});
}

function clearState() {
	addToast({
		data: toastData[2],
	});
	location.hash = "";
	console.log($turtleInput);
	turtleInput.set("");
	systemIter.set(1);
}
</script>

<div id="sidepanel" class="sidepanel fixed shadow">
	<p class="text-gray-800 text-center my-2 font-bold text-xl">Parameters</p>
	<div class="flex flex-col">
		<div class="flex justify-between my-2">
			<fieldset>
				<label for="width">Stroke Color</label>
				<input
					type="color"
					id="width"
					class="input"
					placeholder="Color"
					bind:value={$strokeColor}
				/>
			</fieldset>
		</div>
		<div class="flex justify-between my-2">
			<fieldset>
				<label for="height">Stroke Width</label>
				<input
					type="number"
					id="height"
					class="input"
					min="1"
					max="3"
					step="0.1"
					placeholder="Stroke Width"
					bind:value={$strokeWidth}
				/>
			</fieldset>
		</div>
		<div class="flex justify-between my-2">
			<fieldset>
				<label for="depth">Turn Angle</label>
				<input
					type="number"
					id="depth"
					min="10"
					max="120"
					step="5"
					class="input"
					placeholder="90"
					bind:value={$turnAngle}
				/>
		</div>
		<button class="w-full bg-red-300 ">Generate Fractal</button>
		<button class="w-full  bg-red-200" on:click={shareState}>Share Fractal</button>
		<button class="w-full bg-zinc-100" title="Clear Fractal"
				on:click={clearState}>Clear Fractal</button>
	</div>
</div>
<div
  class="fixed right-0 top-0 z-50 m-4 flex flex-col items-end gap-2 md:bottom-0 md:top-auto"
  use:portal
>
  {#each $toasts as { id, data } (id)}
    <div
      use:melt={$content(id)}
      animate:flip={{ duration: 500 }}
      in:fly={{ duration: 150, x: '100%' }}
      out:fly={{ duration: 150, x: '100%' }}
      class="rounded-lg bg-neutral-800 text-white shadow-md"
    >
      <div
        class={`relative flex w-[24rem] max-w-[calc(100vw-2rem)] items-center justify-between gap-4 p-5`}
      >
        <div>
          <h3
            use:melt={$title(id)}
            class="flex items-center gap-2 font-semibold"
          >
						{data.title}
            <span class="size-1.5 rounded-full {data.color}" />
          </h3>
          <div use:melt={$description(id)}>
            {data.description}
          </div>
        </div>
        <button
          use:melt={$close(id)}
          class="absolute right-4 top-4 grid size-6 place-items-center rounded-full text-magnum-500
          hover:bg-magnum-900/50"
        >
          <X class="size-4" />
        </button>
      </div>
    </div>
  {/each}
</div>

<style>
	.sidepanel {
		display: flex;
		flex-direction: column;
		background-color: #f8fcff;
		height: 100%;
		width: auto; /* 0 width - change this with JavaScript */
		z-index: 1; /* Stay on top */
		top: 0;
		right: 0;
		overflow-x: hidden; /* Disable horizontal scroll */
		min-width: 20%;
	}

	fieldset {
		@apply flex items-center gap-5;
	}

	label {
		@apply w-[75px] text-sm text-neutral-700;
	}

	p {
		@apply mb-2 font-medium text-neutral-900;
	}

	/* .input {
		@apply flex h-8 w-full rounded-md border border-magnum-800 bg-transparent px-2.5 text-sm;
		@apply ring-offset-magnum-300 focus-visible:ring;
		@apply focus-visible:ring-magnum-400 focus-visible:ring-offset-1;
		@apply flex-1 items-center justify-center;
		@apply px-2.5 text-sm leading-none text-magnum-700;
	} */
</style>
