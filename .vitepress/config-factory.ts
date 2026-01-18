import { LocaleSpecificConfig } from "vitepress"
import { Labels } from "./i18n-labels"

export function createThemeConfig(labels: Labels): LocaleSpecificConfig {
  return {
    themeConfig: {
      head: [
        ["meta", { property: "og:site_name", content: "mattheroit.com" }],
        ["meta", { property: "og:locale", content: labels.lang }]
      ],

      logo: { light: "/logo_dark.svg", dark: "/logo_light.svg" },
      siteTitle: "mattheroit.com",
      lang: labels.lang,

      nav: labels.nav,
      sidebar: labels.sidebar,
      aside: true,
      outline: { level: [2, 3], label: labels.outline },
      socialLinks: [{ icon: "github", link: "https://github.com/mattheroit/website" }],
      editLink: {
        pattern: "https://github.com/mattheroit/website/edit/main/src/:path",
        text: labels.editLink
      },
      lastUpdated: {
        text: labels.lastUpdated,
        formatOptions: {
          forceLocale: true,
          dateStyle: "short",
          timeStyle: "short"
        }
      },
      search: {
        provider: "local",
        options: {
          translations: labels.search
        }
      },
      notFound: labels.notFound,
      docFooter: labels.docFooter,
      footer: labels.footer,
      darkModeSwitchLabel: labels.darkModeSwitchLabel,
      darkModeSwitchTitle: labels.darkModeSwitchTitle,
      lightModeSwitchTitle: labels.lightModeSwitchTitle,
      returnToTopLabel: labels.returnToTopLabel,
      langMenuLabel: labels.langMenuLabel,
      skipToContentLabel: labels.skipToContentLabel
    }
  }
}
