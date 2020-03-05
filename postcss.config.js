const purgecss = require("@fullhuman/postcss-purgecss");
const production = !process.env.ROLLUP_WATCH;

module.exports = {
	plugins: [
		require("postcss-import")(),
		require("tailwindcss"),
		require("autoprefixer"),
		// Only purge css in production
		production &&
			purgecss({
				content: ["./**/*.html", "./**/*.svelte"],
				defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
			})
	]
};
