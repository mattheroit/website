import { defineConfig } from "vitepress"
import { createThemeConfig } from "./config-factory"
import { csConfig } from "./locales/cs"
import { enConfig } from "./locales/en"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lastUpdated: true,
  cleanUrls: true,
  srcDir: "src",

  title: "mattheroit.com",

  locales: {
    root: { label: "Čeština", lang: "cs-CZ", link: "/cs/", dir: "ltr", ...createThemeConfig(csConfig) },
    en: { label: "English", lang: "en-US", link: "/en/", dir: "ltr", ...createThemeConfig(enConfig) }
  },

  rewrites(id) {
    // Handle Project Submodules
    // Format: projects/name/docs/lang/file.md -> lang/projects/name/file.md
    const projectMatch = id.match(/^projects\/([^/]+)\/docs\/(en|cs)\/(.*)/)
    if (projectMatch) {
      const [_, project, lang, rest] = projectMatch
      return `${lang}/projects/${project}/${rest}`
    }

    // Protect the root index.md, so that mattheroit.com doesn't resolve as not found
    if (id === "index.md") return id

    // If it's already in /cs/ or /en/, leave it alone
    if (id.startsWith("cs/") || id.startsWith("en/")) {
      return id
    }

    return id
  }
})
