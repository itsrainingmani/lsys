<script>
  import { fly } from "svelte/transition";
  import { path } from "d3-path";
  import { turtleInput, turtleIter, svgStrokeColor, turnAngle } from "./stores";

  export let svgScale;
  /** Only valid instructions are 'F', 'f', '-', '+'
   * 'F' means move forward one unit and trace the path with a line.
   * 'f' means move forward one unit but don't draw anything.
   * '-' means rotate counter-clockwise but don't move.
   * '+' means rotate clockwise but don't move.
   */
  let svg_w = 40; // This is relative to the actual width in pixels
  let svg_h = 40; // This is relative to the actual height in pixels

  $: svg_w = 40 * svgScale;
  $: svg_h = 40 * svgScale;
  $: originX = (-1 * svg_w) / 2;
  $: originY = (-1 * svg_h) / 2;
  $: svgViewBox = `${originX} ${originY} ${svg_w} ${svg_h}`;

  const DEG_TO_RAD = Math.PI / 180;

  let inputFormula = "";
  let numIters = 1;
  turtleInput.subscribe(value => {
    inputFormula = value;
  });

  turtleIter.subscribe(value => {
    numIters = value;
  });

  // $: svgTransform = `scale(${svgScale}) translate(${svgMoveX} ${svgMoveY})`;

  let svgStrokeWidth = `stroke-width: ${0.5}%`;
  $: turtleFormula = transformSequence(inputFormula, numIters);

  // The input sequence has the following format:
  // formula,rule1:output1,rule2:output2,...,ruleN:outputN
  function transformSequence(seq, iters) {
    seq = seq.trim().split(",");
    if (seq.length === 0) {
      return "";
    } else if (seq.length === 1) {
      return seq[0];
    }
    let cmds = seq.shift(); // these are the basic cmds
    let rules = {};

    // Create a mapping of rules to their outputs
    // There can't be more than one output for a rule
    for (const rule of seq) {
      let r = rule.split(":");
      rules[r[0]] = r[1];
    }
    let transformed = "";
    let new_cmds = cmds;

    for (let i = 0; i < iters; i++) {
      console.log(new_cmds);
      // Apply transformation
      for (let j = 0; j < new_cmds.length; j++) {
        if (rules[new_cmds[j]]) {
          transformed += rules[new_cmds[j]];
        } else {
          transformed += new_cmds[j];
        }
      }
      new_cmds = transformed;
      transformed = "";
    }

    return new_cmds;
  }

  function draw_svg(f, turn_amt = 45, move_amt = 2) {
    // Always center the svg context at the bottom
    // let loc = { x: svg_w / 2, y: svg_h, angle: 0 };
    let loc = { x: 0, y: 0, angle: 0 };
    let ctx = path();
    ctx.moveTo(loc.x, loc.y);

    f.split("").forEach(t => {
      let { x, y, angle } = loc;
      switch (t) {
        case "F":
          loc.x = x + Math.sin(angle * DEG_TO_RAD) * move_amt;
          loc.y = y - Math.cos(angle * DEG_TO_RAD) * move_amt;
          ctx.lineTo(loc.x, loc.y);
          ctx.moveTo(loc.x, loc.y);
          break;
        case "f":
          loc.x = x + Math.sin(angle * DEG_TO_RAD) * move_amt;
          loc.y = y - Math.cos(angle * DEG_TO_RAD) * move_amt;
          ctx.moveTo(loc.x, loc.y);
          break;
        case "+":
          loc.angle = (angle + turn_amt) % 360;
          break;
        case "-":
          loc.angle = (angle - turn_amt) % 360;
          break;
      }
    });
    ctx.closePath();

    return ctx.toString();
  }

  function panViewportLeft(e) {
    originX += 2 * svgScale;
  }

  function panViewportRight(e) {
    originX -= 2 * svgScale;
  }

  function panViewportUp(e) {
    originY += 2 * svgScale;
  }

  function panViewportDown(e) {
    originY -= 2 * svgScale;
  }

  // svgScale * svg width gives the current width of the viewport
  // svgScale * svg height gives the current height of the viewport
  // event.srcElement.clientHeight gets the height of the parent div
  // event.srcElement.clientWidth gets the width of the parent div
  // the mouse events are in terms of the parent div and not the svg viewport
</script>

<style>
  svg {
    stroke-opacity: 90%;
    overflow: scroll;
  }

  div {
    overflow: scroll;
  }

  .svg-box {
    background-color: #f8fcff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23c6ddff' fill-opacity='0.6'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }

  path {
    fill: none;
  }
</style>

<div
  transition:fly={{ y: -50, duration: 500 }}
  class="svg-box items-center transition-colors duration-100 ease-in-out
  bg-white shadow-md focus:outline-0 border border-transparent
  placeholder-gray-600 rounded-md block w-full appearance-none leading-tight
  my-2">
  <svg viewBox={svgViewBox} style={svgStrokeWidth}>
    <path d={draw_svg(turtleFormula, $turnAngle)} stroke={$svgStrokeColor} />
  </svg>
</div>
<div
  class="inline-flex transition-colors duration-100 ease-in-out bg-white shadow
  rounded appearance-none leading-tight">
  <button
    on:click={panViewportLeft}
    class="bg-white hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-l">
    ←
  </button>
  <button
    on:click={panViewportUp}
    class="bg-white hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-none">
    ↑
  </button>
  <button
    on:click={panViewportRight}
    class="bg-white hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-none">
    →
  </button>
  <button
    on:click={panViewportDown}
    class="bg-white hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-r">
    ↓
  </button>
</div>
