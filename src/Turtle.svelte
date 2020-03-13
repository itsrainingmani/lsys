<script>
  import { fly } from "svelte/transition";
  import { path } from "d3-path";
  import { turtleInput, turtleIter } from "./stores";

  export let svgScale;
  /** Only valid instructions are 'F', 'f', '-', '+'
   * 'F' means move forward one unit and trace the path with a line.
   * 'f' means move forward one unit but don't draw anything.
   * '-' means rotate counter-clockwise but don't move.
   * '+' means rotate clockwise but don't move.
   */
  let svg_w = 50; // This is relative to the actual width in pixels
  let svg_h = 50; // This is relative to the actual height in pixels
  let svgViewBox = `-${svg_w / 2} -${svg_h / 2} ${svg_w} ${svg_h}`;

  let startMoveX = 0;
  let startMoveY = 0;
  let svgMoveX = 0; // translation x-axis offset
  let svgMoveY = 0; // translation y-axis offset

  const DEG_TO_RAD = Math.PI / 180;

  let inputFormula = "";
  let numIters = 1;
  turtleInput.subscribe(value => {
    inputFormula = value;
  });

  turtleIter.subscribe(value => {
    numIters = value;
  });

  $: svgTransform = `scale(${svgScale}) translate(${svgMoveX} ${svgMoveY})`;
  $: svgStrokeWidth = `stroke-width: ${0.5 + 1 / (svgScale * 1.5)}%`;

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
      // Apply transformation
      for (let j = 0; j < new_cmds.length; j++) {
        transformed += rules[new_cmds[j]];
      }
      new_cmds = transformed;
      transformed = "";
    }

    return new_cmds;
  }

  /**
   * SVG Layout -
   * (0,0) is at the top left corner
   * (x, y) is at bottom right
   */
  function draw_svg(f, turn_amt = 45, move_amt = 2) {
    if (f.length === 0) {
      // Reset the svg translation offsets
      svgMoveX = 0;
      svgMoveY = 0;
    }
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

    return ctx.toString();
  }

  // function handleMouseMove(e) {
  //   console.log(e.offsetX, e.offsetY);
  // }

  function handleMouseDown(e) {
    startMoveX = e.offsetX;
    startMoveY = e.offsetY;
  }

  function handleMouseUp(e) {
    svgMoveX = (e.offsetX - startMoveX) / (5 * svgScale);
    svgMoveY = (e.offsetY - startMoveY) / (5 * svgScale);
  }
</script>

<style>
  svg {
    stroke-opacity: 90%;
  }

  .svg-box {
    background-color: #f8fcff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23c6ddff' fill-opacity='0.6'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }

  path {
    stroke: #ff3e00;
    fill: none;
  }
</style>

<div
  transition:fly={{ y: -50, duration: 500 }}
  class="svg-box items-center transition-colors duration-100 ease-in-out
  bg-white shadow-md focus:outline-0 border border-transparent
  placeholder-gray-600 rounded-md block w-full appearance-none leading-tight
  my-2">
  <svg
    viewBox={svgViewBox}
    style={svgStrokeWidth}
    on:mouseup={handleMouseUp}
    on:mousedown={handleMouseDown}>
    <path d={draw_svg(turtleFormula)} transform={svgTransform} />
  </svg>
</div>
