import { expect, test } from "vitest";
import { LSystem } from "./system";

test("multiple symbols", () => {
	const lsys = new LSystem("F,G;FF;F:F+F+F+F,G:G+G+G+G");
	// console.log(lsys.rule_map, lsys.symbols);
	expect(lsys.symbols).toEqual(["F", "G"]);
});

test("single symbol", () => {
	const lsys = new LSystem("F;F;F:F+F+F+F");
	// console.log(lsys.rule_map, lsys.symbols);
	expect(lsys.symbols).toEqual(["F"]);
});

test("axiom", () => {
	const lsys = new LSystem("F;FF;F:F+F+F+F");
	// console.log(lsys.rule_map, lsys.symbols);
	expect(lsys.axiom).toEqual("FF");
});

test("rewrite rule map", () => {
	const lsys = new LSystem("F;F;F:F+F+F+F");
	const rewrite_map = new Map<string, string[]>([
		["F", ["F", "+", "F", "+", "F", "+", "F"]],
	]);
	expect(lsys.rule_map).toEqual(rewrite_map);
});

test("rewrite 1st iter", () => {
	const lsys = new LSystem("F;F;F:F+F+F+F");
	const first_iter = lsys.rewrite(1);
	expect(first_iter).toEqual(["F", "+", "F", "+", "F", "+", "F"]);
});
