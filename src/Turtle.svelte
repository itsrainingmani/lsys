<script>
  import { fly } from "svelte/transition";
  import { path } from "d3-path";
  import { turtleInput } from "./stores";
  /** Only valid instructions are 'F', 'f', '-', '+'
   * 'F' means move forward one unit and trace the path with a line.
   * 'f' means move forward one unit but don't draw anything.
   * '-' means rotate counter-clockwise but don't move.
   * '+' means rotate clockwise but don't move.
   */
  let svg_w = 100; // This is relative to the actual width in pixels
  let svg_h = 100; // This is relative to the actual height in pixels
  const DEG_TO_RAD = Math.PI / 180;
  /**
   * SVG Layout -
   * (0,0) is at the top left corner
   * (x, y) is at bottom right
   */
  function draw_svg(f, turn_amt = 45) {
    console.log(f);
    // Always center the svg context at the bottom
    let location = { x: svg_w / 2, y: svg_h, angle: 0 };
    let ctx = path();
    ctx.moveTo(location.x, location.y);

    f.split("").forEach(t => {
      let { x, y, angle } = location;
      switch (t) {
        case "F":
          location.x = x + Math.sin(angle * DEG_TO_RAD);
          location.y = y - Math.cos(angle * DEG_TO_RAD);
          ctx.lineTo(x, y);
          ctx.moveTo(x, y);
          break;
        case "f":
          location.x = x + Math.sin(angle * DEG_TO_RAD);
          location.y = y - Math.cos(angle * DEG_TO_RAD);
          ctx.moveTo(x, y);
          break;
        case "+":
          location.angle = (angle + turn_amt) % 360;
          break;
        case "-":
          location.angle = (angle - turn_amt) % 360;
          break;
      }
    });

    return ctx.toString();
  }
</script>

<style>
  svg {
    stroke-width: 0.7%;
    stroke-opacity: 90%;
  }

  .svg-box {
    background-color: #f8fcff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23c6ddff' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
</style>

<div
  transition:fly={{ y: -50, duration: 500 }}
  class="svg-box items-center transition-colors duration-100 ease-in-out
  bg-white shadow-md focus:outline-0 border border-transparent
  placeholder-gray-600 rounded-lg block w-full appearance-none leading-normal">
  <svg viewBox="0 0 100 100">
    <path stroke="blue" fill="none" d={draw_svg($turtleInput)} />
  </svg>
</div>
