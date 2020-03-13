import { writable } from "svelte/store";

export const turtleInput = writable("");
export const turtleIter = writable(1);
export const svgStrokeColor = writable("#ff3e00");
export const turnAngle = writable(45);
