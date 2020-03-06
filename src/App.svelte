<script>
  import { onMount } from "svelte";
  import { fly, draw } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import Footer from "./Footer.svelte";
  import { path } from "d3-path";
  import { typewriter } from "./utils";

  let enableTransition = false;
  let turtle_formula = "";
  let ctx = "";
  let svg_w = 100; // This is relative to the actual width in pixels
  let svg_h = 100; // This is relative to the actual height in pixels
  const sample_svgs = [
    [
      "Heart",
      "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z"
    ]
  ];
  // let [turtle_formula, ctx] = sample_svgs[0];

  // When the component is mounted, set enableTransition to true
  // This will trigger the animation
  onMount(() => {
    setTimeout(() => {
      enableTransition = true;
    }, 1000);
  });

  function handleInputChange(event) {
    console.log(svg_w, svg_h);
    // Move the svg context to the center
    ctx = path();
    ctx.moveTo(svg_w / 2, svg_h / 2);
    let t = turtle_formula[0];
    if (t === "F") {
      ctx.lineTo(svg_w / 2, svg_h / 2 - 6);
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

  svg {
    stroke-width: 0.7%;
    stroke-opacity: 90%;
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

  .svg-box {
    background-color: #f8fcff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23c6ddff' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
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
        bind:value={turtle_formula}
        on:input={handleInputChange}
        aria-label="Turtle" />
    </div>
    <br />
    <div
      transition:fly={{ y: -50, duration: 500 }}
      class="svg-box items-center transition-colors duration-100 ease-in-out
      bg-white shadow-md focus:outline-0 border border-transparent
      placeholder-gray-600 rounded-lg block w-full appearance-none
      leading-normal">
      <svg viewBox="0 0 100 100">
        <path stroke="blue" fill="none" d={ctx} />
      </svg>
    </div>
  {/if}
</main>
<Footer />
