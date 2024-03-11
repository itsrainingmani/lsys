import { expect, test } from "vitest";
import { LSystem } from "./system";

test("multiple symbols", () => {
	let lsys = new LSystem("F,G;FF;F:F+F+F+F,G:G+G+G+G");
	// console.log(lsys.rule_map, lsys.symbols);
	expect(lsys.symbols).toEqual(["F", "G"]);
});

test("single symbol", () => {
	let lsys = new LSystem("F;F;F:F+F+F+F");
	// console.log(lsys.rule_map, lsys.symbols);
	expect(lsys.symbols).toEqual(["F"]);
});

test("axiom", () => {
	let lsys = new LSystem("F;FF;F:F+F+F+F");
	// console.log(lsys.rule_map, lsys.symbols);
	expect(lsys.axiom).toEqual("FF");
});

test("rewrite rule map", () => {
	let lsys = new LSystem("F;F;F:F+F+F+F");
	let rewrite_map = new Map<string, string[]>([
		["F", ["F", "+", "F", "+", "F", "+", "F"]],
	]);
	expect(lsys.rule_map).toEqual(rewrite_map);
});

test("rewrite 1st iter", () => {
	let lsys = new LSystem("F;F;F:F+F+F+F");
	let first_iter = lsys.rewrite(1);
	expect(first_iter).toEqual(["F", "+", "F", "+", "F", "+", "F"]);
});
