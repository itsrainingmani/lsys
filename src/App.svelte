<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  let visible = false;

  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 1000);
  });
</script>

<style>
  p {
    font-family: "Rubik", sans-serif;
    font-size: 1.5em;
  }
</style>

<main class="flex-grow self-center">
  <h1>L systems</h1>
  {#if visible}
    <p transition:fly={{ y: 200, duration: 2000 }}>
      An Interactive Fractal Generator
    </p>
  {/if}
</main>
<footer class="self-center">
  &copy; 2020. Built using
  <a href="https://svelte.dev">
    <i>Svelte</i>
  </a>
</footer>
