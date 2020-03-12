<script>
  import { onMount } from "svelte";
  import { fly, draw } from "svelte/transition";
  import Footer from "./Footer.svelte";
  import Turtle from "./Turtle.svelte";
  import { turtleInput } from "./stores";

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

  let turtleScale = 1;

  function handleInput(event) {
    console.log(event.inputType);
    console.log(event.data);

    switch (event.inputType) {
      case "insertText":
        turtleInput.update(t => t + event.data);
        break;
      case "deleteContentBackward":
        turtleInput.update(t => t.slice(0, -1));
        break;
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
    }

    main {
      width: 80%;
      max-width: 320px;
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
      <input
        title="Turtle Formula Input"
        type="text"
        class="transition-colors duration-100 ease-in-out bg-white shadow-lg
        focus:outline-0 border border-transparent placeholder-gray-600
        rounded-lg py-2 px-4 block w-full appearance-none leading-normal
        ds-input text-center"
        on:input={handleInput}
        aria-label="Turtle" />
      <Turtle svgScale={turtleScale} />
      <input
        title="Turtle SVG Scaler"
        type="range"
        min="0.1"
        max="1"
        step="0.1"
        bind:value={turtleScale} />
    </div>
  {/if}
</main>
<Footer />
