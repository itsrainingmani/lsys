<script>
  import { fly, fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { svgStrokeColor, turnAngle, svgStrokeWidth } from "./stores.js";

  let visible = false;

  let angles = [15, 30, 45, 60, 90];
</script>

<style>
  .sidepanel {
    background-color: #f8fcff;
    height: 100%; /* Specify a height */
    width: 250px; /* 0 width - change this with JavaScript */
    z-index: 1; /* Stay on top */
    top: 0;
    right: 0;
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 40px; /* Place content 60px from the top */
  }

  @media (max-width: 640px) {
    .sidepanel {
      width: 100%;
    }
  }

  .sidepanel .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }

  button {
    position: absolute;
    top: 5px;
    right: 5px;
  }
</style>

{#if visible}
  <div
    transition:fly={{ delay: 250, duration: 300, easing: quintOut, x: 250 }}
    id="sidepanel"
    class="sidepanel fixed shadow">
    <p class="text-gray-800 text-center my-2">Options</p>
    <a
      href="javascript:void(0)"
      class="closebtn"
      on:click={() => (visible = false)}>
      &times;
    </a>
    <div class="flex flex-col">
      <div class="flex justify-between my-2">
        <label for="stroke-color" class="text-gray-800 px-2">
          Stroke Color
        </label>
        <input
          name="stroke-color"
          title="Stroke Color Picker"
          type="color"
          class="transition-colors duration-100 ease-in-out bg-white shadow-md
          focus:outline-0 border border-transparent rounded-md py-2 px-2 block
          w-2/6 appearance-none leading-tight ds-input text-center self-center
          mr-2"
          bind:value={$svgStrokeColor}
          aria-label="Stroke Color Picker" />
      </div>
      <div class="flex justify-between my-2">
        <label for="angle-selector" class="text-gray-800 px-2">
          Turn Angle
        </label>
        <select
          name="angle-selector"
          title="Angle Selector"
          class="transition-colors duration-100 ease-in-out bg-white shadow-md
          focus:outline-0 border border-transparent rounded-md block w-2/6
          appearance-none leading-tight ds-input text-center self-center mr-2"
          bind:value={$turnAngle}
          aria-label="Angle Select">
          {#each angles as angle}
            <option value={angle}>{angle}</option>
          {/each}
        </select>
      </div>
      <div class="flex justify-between my-2">
        <label for="stroke-width" class="text-gray-800 px-2">
          Stroke Width
        </label>
        <input
          name="stroke-width"
          title="Stroke Width"
          type="number"
          min="0.1"
          max="1"
          step="0.1"
          class="transition-colors duration-100 ease-in-out bg-white shadow-md
          focus:outline-0 border border-transparent rounded-md px-2 block w-2/6
          appearance-none leading-tight ds-input text-center self-center mr-2"
          bind:value={$svgStrokeWidth}
          aria-label="Stroke Width Picker" />
      </div>
    </div>
  </div>
{/if}

<button
  class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border
  border-gray-400 rounded shadow"
  on:click={() => (visible = true)}>
  &#9776;
</button>
