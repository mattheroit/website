import { DefaultTheme } from "vitepress"
import { Labels } from "../i18n-labels"

export const enConfig: Labels = {
  lang: "en-US",

  // https://vitepress.dev/reference/default-theme-config
  // nav:
  sidebar: sidebar()
}

function sidebar(): DefaultTheme.Sidebar {
  return {
    "/asterisk/": [{ text: "Asterisk" }]
  }
}
