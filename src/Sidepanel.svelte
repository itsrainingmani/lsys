<script>
  import { fly, fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  let visible = false;
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
    padding-top: 60px; /* Place content 60px from the top */
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
    <a
      href="javascript:void(0)"
      class="closebtn"
      on:click={() => (visible = false)}>
      &times;
    </a>
    <p>Item 1</p>
    <p>Item 2</p>
    <p>Item 3</p>
  </div>
{/if}

<button
  class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border
  border-gray-400 rounded shadow"
  on:click={() => (visible = true)}>
  &#9776;
</button>
