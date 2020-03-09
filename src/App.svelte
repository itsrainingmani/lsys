<script>
  import { onMount } from "svelte";
  import { fly, draw } from "svelte/transition";
  // import { quintOut } from "svelte/easing";
  import Footer from "./Footer";
  import Turtle from "./Turtle";

  let enableTransition = false;
  let formula = "";
  const sample_svgs = [
    [
      "Heart",
      "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z"
    ]
  ];

  // When the component is mounted, set enableTransition to true
  // This will trigger the animation
  onMount(() => {
    setTimeout(() => {
      enableTransition = true;
    }, 1000);
  });
</script>

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
        type="text"
        class="transition-colors duration-100 ease-in-out bg-white shadow-md
        focus:outline-0 border border-transparent placeholder-gray-600
        rounded-lg py-2 px-4 block w-full appearance-none leading-normal
        ds-input text-center"
        bind:value={formula}
        aria-label="Turtle" />
    </div>
    <br />
    <Turtle {formula} />
  {/if}
</main>
<Footer />
