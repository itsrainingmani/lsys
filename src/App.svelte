<script>
  import { onMount } from "svelte";
  import { fly, draw } from "svelte/transition";
  import Footer from "./Footer.svelte";
  import Turtle from "./Turtle.svelte";
  import { turtleInput } from "./stores";

  let enableTransition = false;
  let formula = "";

  $: if (formula.length === 0) {
    turtleInput.update(t => formula);
  }

  // When the component is mounted, set enableTransition to true
  // This will trigger the animation
  onMount(() => {
    setTimeout(() => {
      enableTransition = true;
    }, 1000);
  });

  let turtleScale = 1;

  function handleInput(event) {
    // When the Enter key is pressed, update the store
    if (event.keyCode === 13) {
      console.log(formula);
      turtleInput.update(t => formula);
    }
  }
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
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }

    main {
      width: 80%;
      max-width: 320px;
    }

    #turtle-inputs {
      flex-direction: column;
    }

    #turtle-inputs input[type="text"] {
      width: 100%;
      margin-bottom: 0.25rem;
    }
  }

  input[type="range"] {
    background-color: transparent;
  }

  input[type="range"]:hover {
    cursor: pointer;
  }

  /* main {
    width: 100%;
    max-width: 400px;
  } */
</style>

<main class="flex-grow self-center">
  <h1 class="py-2">L systems</h1>
  {#if enableTransition}
    <div transition:fly={{ y: -50, duration: 500 }}>
      <p>An Interactive Fractal Generator</p>
      <br />
      <div class="flex" id="turtle-inputs">
        <input
          title="Turtle Formula Input"
          type="text"
          placeholder="Turtle Formula:"
          class="transition-colors duration-100 ease-in-out bg-white shadow-md
          focus:outline-0 border border-transparent placeholder-gray-600
          rounded-md py-2 px-4 block w-5/6 mr-1 appearance-none leading-tight
          ds-input text-center"
          on:keypress={handleInput}
          bind:value={formula}
          aria-label="Turtle Formula Input" />
        <input
          title="Formula Iterations"
          type="number"
          min="1"
          class="transition-colors duration-100 ease-in-out bg-white shadow-md
          focus:outline-0 border border-transparent placeholder-gray-600
          rounded-md py-2 px-2 block w-1/6 appearance-none leading-tight
          ds-input text-center"
          aria-label="Formula Iterations" />
      </div>
      <Turtle svgScale={turtleScale} />
      <input
        title="Turtle SVG Scaler"
        type="range"
        min="1"
        max="10"
        step="0.1"
        bind:value={turtleScale} />
    </div>
  {/if}
</main>
<Footer />
