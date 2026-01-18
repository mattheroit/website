import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lastUpdated: true,
  cleanUrls: true,
  srcDir: "src",
  lang: "cs-CZ",

  title: "mattheroit.com",
  //description: "description",
  head: [
    ["link", { rel: "icon", href: "/logo_dark.svg", id: "favicon" }],
    ["script", { src: "/scripts/favicon_switcher.js" }],
    ["meta", { property: "og:site_name", content: "mattheroit.com" }],
    ["meta", { property: "og:locale", content: "cs-CZ" }]
  ],

  themeConfig: {
    logo: { light: "/logo_dark.svg", dark: "/logo_light.svg" },
    siteTitle: "mattheroit.com",

    // https://vitepress.dev/reference/default-theme-config
    // nav: [],

    sidebar: {
      "/asterisk/": [{ text: "Asterisk" }]
    },

    aside: true,
    outline: { level: [2, 3], label: "Na této stránce" },
    socialLinks: [{ icon: "github", link: "https://github.com/mattheroit/website" }],
    // footer: {},
    editLink: {
      pattern: "https://github.com/mattheroit/website/edit/main/src/:path",
      text: "Upravit na GitHubu"
    },
    lastUpdated: {
      text: "Naposledy upraveno",
      formatOptions: {
        forceLocale: true,
        dateStyle: "short",
        timeStyle: "short"
      }
    },
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "Hledat",
                buttonAriaLabel: "Hledat"
              },
              modal: {
                displayDetails: "Detailní seznam",
                resetButtonTitle: "Resetovat pole",
                backButtonTitle: "Zavřít",
                noResultsText: "Žádný výsledek pro",
                footer: {
                  selectText: "Vybrat",
                  selectKeyAriaLabel: "Enter",
                  navigateText: "Navigovat",
                  navigateUpKeyAriaLabel: "Šipka nahoru",
                  navigateDownKeyAriaLabel: "Šipka dolu",
                  closeText: "Zavřít",
                  closeKeyAriaLabel: "Escape"
                }
              }
            }
          }
        }
      }
    },
    docFooter: { prev: "Předchozí", next: "Další" },
    darkModeSwitchLabel: "Vzhled",
    darkModeSwitchTitle: "Přepnout na tmavý režim",
    lightModeSwitchTitle: "Přepnout na světlý režim",
    returnToTopLabel: "Vrátit na začátek",
    langMenuLabel: "Jazyk",
    skipToContentLabel: "Přeskočit k obsahu"
  }
})
