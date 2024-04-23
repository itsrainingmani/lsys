<script lang="ts">
	import { createPopover, melt } from "@melt-ui/svelte";
	import { fade } from "svelte/transition";
	import { Settings2, X } from "lucide-svelte";
	import { strokeColor, turnAngle, strokeWidth } from "./stores.js";

	const {
		elements: { trigger, content, arrow, close },
		states: { open },
	} = createPopover({
		forceVisible: true,
	});
</script>

<button
	type="button"
	class="trigger top-0 right-0 m-2 absolute"
	use:melt={$trigger}
	aria-label="Update Parameters"
>
	<Settings2 class="size-4" />
	<span class="sr-only">Open Popover</span>
</button>

{#if $open}
	<div use:melt={$content} transition:fade={{ duration: 100 }} class=" content">
		<div use:melt={$arrow} />
		<div class="flex flex-col gap-2.5">
			<p>Parameters</p>
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
			<fieldset>
				<label for="height">Stroke Width</label>
				<input
					type="number"
					id="height"
					class="input"
					min="0.1"
					max="1"
					step="0.1"
					placeholder="Stroke Width"
					bind:value={$strokeWidth}
				/>
			</fieldset>
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
			</fieldset>
		</div>
		<button class="close" use:melt={$close}>
			<X class="size-4" />
		</button>
	</div>
{/if}

<style>
	fieldset {
		@apply flex items-center gap-5;
	}

	label {
		@apply w-[75px] text-sm text-neutral-700;
	}

	p {
		@apply mb-2 font-medium text-neutral-900;
	}

	.input {
		@apply flex h-8 w-full rounded-md border border-magnum-800 bg-transparent px-2.5 text-sm;
		@apply ring-offset-magnum-300 focus-visible:ring;
		@apply focus-visible:ring-magnum-400 focus-visible:ring-offset-1;
		@apply flex-1 items-center justify-center;
		@apply px-2.5 text-sm leading-none text-magnum-700;
	}

	.trigger {
		@apply inline-flex h-9 w-9 items-center justify-center rounded-full bg-white p-0;
		@apply text-sm font-medium text-magnum-900 transition-colors hover:bg-white/90;
		@apply focus-visible:ring focus-visible:ring-magnum-400 focus-visible:ring-offset-2;
	}

	.close {
		@apply absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full;
		@apply text-magnum-900 transition-colors hover:bg-magnum-500/10;
		@apply focus-visible:ring focus-visible:ring-magnum-400 focus-visible:ring-offset-2;
		@apply bg-white p-0 text-sm font-medium;
	}

	.content {
		@apply z-10 w-60 rounded-[4px] bg-white p-5 shadow-sm;
	}
</style>
