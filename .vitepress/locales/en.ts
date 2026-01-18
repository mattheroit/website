import { DefaultTheme } from "vitepress"
import { Labels } from "../i18n-labels"

export const enConfig: Labels = {
  lang: "en-US",

  // https://vitepress.dev/reference/default-theme-config
  // nav:
  sidebar: sidebar(),
  footer: { copyright: "Copyright © 2026 mattheroit" }
}

function sidebar(): DefaultTheme.Sidebar {
  return {
    "/en/asterisk/": [
      { text: "Asterisk", base: "/en/asterisk/", items: [{ text: "Instalation and basic configuration", link: "instalation_and_configuration" }] }
    ]
  }
}
