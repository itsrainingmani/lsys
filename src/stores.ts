import { writable } from "svelte/store";

export const turtleInput = writable("");
export const systemIter = writable(1);
export const strokeColor = writable("#ff3e00");
export const turnAngle = writable(45);
export const strokeWidth = writable(1);
