<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import Footer from "./Footer.svelte";

  let enableTransition = false;

  // When the component is mounted, set enableTransition to true
  // This will trigger the animation
  onMount(() => {
    setTimeout(() => {
      enableTransition = true;
    }, 1000);
  });

  let turtle_formula = "";
</script>

<style>
  p {
    font-family: "Rubik", sans-serif;
    font-size: 1.5em;
  }

  @media (max-width: 640px) {
    p {
      font-size: 1em;
    }
  }

  h1 {
    color: #ff3e00;
    font-family: "Oleo Script Swash Caps", cursive;
    font-style: italic;
    font-size: 4em;
    font-weight: 100;
    line-height: normal;
  }

  @media (max-width: 640px) {
    h1 {
      font-size: 3em;
    }
  }
</style>

<main class="flex-grow self-center">
  <h1 class="py-2">L systems</h1>
  {#if enableTransition}
    <div transition:fly={{ y: -50, duration: 500 }}>
      <p>An Interactive Fractal Generator</p>
      <br />
      <input
        title="Turtle Formula Input"
        class="transition-colors duration-100 ease-in-out bg-white shadow-md
        focus:outline-0 border border-transparent placeholder-gray-600
        rounded-lg py-2 pr-4 pl-4 block w-full appearance-none leading-normal
        ds-input text-center"
        bind:value={turtle_formula}
        aria-label="Turtle"
        autofocus />
    </div>
  {/if}
</main>
<Footer />
