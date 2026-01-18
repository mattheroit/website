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
    // 1. Match the pattern: projects/[name]/docs/[lang]/[file]
    // The regex captures 'project-name' as $1, 'lang' as $2, and 'the-rest' as $3
    const match = id.match(/^projects\/([^/]+)\/docs\/(en|cs)\/(.*)/)

    if (match) {
      const [_, project, lang, rest] = match

      // 2. Return the new structure: [lang]/projects/[project]/[file]
      // This turns 'projects/my-app/docs/en/intro.md' into 'en/projects/my-app/intro.md'
      return `${lang}/projects/${project}/${rest}`
    }

    // 3. Fallback for files that are NOT in a project submodule
    // If it's a bare file like 'src/about.md', move it to 'cs/about.md'
    if (!id.startsWith("en/") && !id.startsWith("cs/") && !id.startsWith(".vitepress")) {
      return `cs/${id}`
    }

    return id
  }
})
