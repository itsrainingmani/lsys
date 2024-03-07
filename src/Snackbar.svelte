<script lang="ts">
	import { fly } from "svelte/transition";
	export let message = "";
</script>

<div
	transition:fly|global={{ y: 200, duration: 200 }}
	class="snackbar transition-colors bg-gray-600 shadow-md focus:outline-0
    border border-transparent rounded-md px-2 py-2 appearance-none leading-tight"
>
	<p class="white">{message}</p>
</div>

<style>
	.snackbar {
		min-width: 250px; /* Set a default minimum width */
		margin-left: -125px; /* Divide value of min-width by 2 */
		text-align: center; /* Centered text */
		position: fixed; /* Sit on top of the screen */
		z-index: 1; /* Add a z-index if needed */
		left: 50%; /* Center the snackbar */
		bottom: 30px; /* 30px from the bottom */
	}
</style>
