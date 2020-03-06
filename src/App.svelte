<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import Footer from "./Footer.svelte";

  let visible = false;

  // When the component is mounted, set visible to true
  // This will trigger the animation
  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 1000);
  });

  let turtle_formula = "";
</script>

<style>
  p {
    font-family: "Rubik", sans-serif;
    font-size: 1.5em;
  }

  /* input {
    text-align: center;
    border: 1px solid #aaa;
    border-radius: 2px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    padding: 1em;
    margin: 0 0 1em 0;
  } */
</style>

<main class="flex-grow self-center">
  <h1>L systems</h1>
  {#if visible}
    <p transition:fly={{ y: -50, duration: 500 }}>
      An Interactive Fractal Generator
    </p>
  {/if}
  <br />
  <input
    title="Turtle Formula Input"
    class="transition-colors duration-100 ease-in-out bg-white shadow-md
    focus:outline-0 border border-transparent placeholder-gray-600 rounded-lg
    py-2 pr-4 pl-10 block w-full appearance-none leading-normal ds-input"
    bind:value={turtle_formula}
    aria-label="Turtle" />
</main>
<Footer />
