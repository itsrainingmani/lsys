/** typewriter
 * Function that performs a typewriter animation on a given node.
 * the node has to have a value object to operate on
 * the default speed is 100
 */
export const typewriter = (node, { speed = 100 }) => {
	console.log(speed);
	const text = node.value;
	const duration = text.length * speed;

	return {
		duration,
		tick: t => {
			const i = ~~(text.length * t);
			node.value = text.slice(0, i);
		}
	};
};
