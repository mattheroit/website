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
		["link", { rel: "icon", href: "/logo_dark.svg", id: "favicon" }],
		["script", { src: "/scripts/favicon_switcher.js" }],
		["meta", { property: "og:site_name", content: "Hlavní otevírač oken" }],
		["meta", { property: "og:locale", content: "cs-CZ" }],
	],

	themeConfig: {
		logo: { light: "/logo_dark.svg", dark: "/logo_light.svg" },
		siteTitle: "HOO",

		// https://vitepress.dev/reference/default-theme-config
		// nav: [],

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

		aside: true,
		outline: { level: [2, 3], label: "Na této stránce" },
		socialLinks: [{ icon: "github", link: "https://github.com/mattheroit/hlavni-otevirac-oken" }],
		// footer: {},
		editLink: {
			pattern: "https://github.com/mattheroit/hlavni-otevirac-oken/edit/main/src/:path",
			text: "Upravit na GitHubu",
		},
		lastUpdated: {
			text: "Naposledy upraveno",
			formatOptions: {
				forceLocale: true,
				dateStyle: "short",
				timeStyle: "short",
			},
		},
		search: { provider: "local" },
		docFooter: { prev: "Předchozí", next: "Další" },
		darkModeSwitchLabel: "Vzhled",
		darkModeSwitchTitle: "Přepnout na tmavý režim",
		lightModeSwitchTitle: "Přepnout na světlý režim",
		returnToTopLabel: "Vrátit na začátek",
		langMenuLabel: "Jazyk",
		skipToContentLabel: "Přeskočit k obsahu",
	},
});
