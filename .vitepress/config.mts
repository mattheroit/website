import { defineConfig } from "vitepress"
import { createThemeConfig } from "./config-factory"
import { csConfig } from "./locales/cs"
import { enConfig } from "./locales/en"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lastUpdated: true,
  cleanUrls: true,
  srcDir: "src",

  locales: {
    root: { label: "Čeština", lang: "cs-CZ", link: "/cs/", dir: "ltr", ...createThemeConfig(csConfig) },
    en: { label: "English", lang: "en-US", link: "/en/", dir: "ltr", ...createThemeConfig(enConfig) }
  },

  rewrites(id) {
    // If it's already in /cs/ or /en/, leave it alone
    if (id.startsWith("cs/") || id.startsWith("en/")) {
      return id
    }

    // Format: projects/name/docs/en/file.md -> en/projects/name/file.md
    const projectMatch = id.match(/^projects\/([^/]+)\/docs\/(en|cs)\/(.*)/)
    if (projectMatch) {
      const [_, project, lang, rest] = projectMatch
      return `${lang}/projects/${project}/${rest}`
    }

    return id
  }
})
