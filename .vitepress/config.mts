import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	lastUpdated: true,
	cleanUrls: true,
	srcDir: "src",
	lang: "cs-CZ",

	title: "title",
	description: "description",
	head: [
		["link", { rel: "icon", href: "/logo_black.svg", type: "image/svg+xml" }],
		["meta", { property: "og:site_name", content: "site name" }],
		["meta", { property: "og:locale", content: "cs-CZ" }],
	],

	themeConfig: {
		logo: { light: "/logo_black.svg", dark: "/logo_white.svg" },
		siteTitle: "site title",

		// https://vitepress.dev/reference/default-theme-config
		// nav: [{ text: "Home", link: "/" }],

		sidebar: {
			"/CJL/zapisky/": [
				{ items: [{ text: "Obsah", link: "./" }] },
				{
					text: "Zapisky",
					items: [{}],
				},
			],
			"/CJL/rozbory/": [
				{ items: [{ text: "Obsah", link: "./" }] },
				{
					text: "Rozbory",
					items: [{}],
				},
			],
		},

		socialLinks: [{ icon: "github", link: "https://github.com/mattheroit/hlavni-otevirac-oken" }],
		search: { provider: "local" },

		footer: {
			message: "<a href=''>TODO</a>",
		},

		editLink: {
			pattern: "https://github.com/mattheroit/hlavni-otevirac-oken/edit/main/src/:path",
			text: "Upravit na GitHubu",
		},
	},
});
