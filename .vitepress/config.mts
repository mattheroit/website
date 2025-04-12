import { defineConfig } from "vitepress";
import { createSidebarLinks } from "./scripts/create_sidebar_links";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	lastUpdated: true,
	cleanUrls: true,
	srcDir: "src",
	lang: "cs-CZ",

	title: "HOO",
	//description: "description",
	head: [
		["link", { rel: "icon", href: "/logo_black.svg", type: "image/svg+xml" }],
		["meta", { property: "og:site_name", content: "Hlavní otevírač oken" }],
		["meta", { property: "og:locale", content: "cs-CZ" }],
	],

	themeConfig: {
		logo: { light: "/logo_black.svg", dark: "/logo_white.svg" },
		siteTitle: "HOO",

		// https://vitepress.dev/reference/default-theme-config
		// nav: [{ text: "Home", link: "/" }],

		sidebar: {
			"/CJL/zapisky/": [
				//{ items: [{ text: "Obsah", link: "/CJL/zapisky/" }] },
				{ text: "Zapisky", items: createSidebarLinks("/CJL/zapisky/") },
			],
			"/CJL/rozbory/": [
				//{ items: [{ text: "Obsah", link: "/CJL/rozbory/" }] },
				{ text: "Rozbory", items: createSidebarLinks("/CJL/rozbory/") },
			],
		},

		socialLinks: [{ icon: "github", link: "https://github.com/mattheroit/hlavni-otevirac-oken" }],
		search: { provider: "local" },

		// footer: { message: "<a href=''>TODO</a>" },

		editLink: {
			pattern: "https://github.com/mattheroit/hlavni-otevirac-oken/edit/main/src/:path",
			text: "Upravit na GitHubu",
		},
	},
});
