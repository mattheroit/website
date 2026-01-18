import { DefaultTheme } from "vitepress"
import { Labels } from "../i18n-labels"

export const csConfig: Labels = {
  lang: "cs-CZ",

  sidebarMenuLabel: "Menu",
  sidebar: sidebar(),
  outline: "Na této stránce",
  editLink: "Upravit na GitHubu",
  lastUpdated: "Naposledy upraveno",
  search: {
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
  },

  docFooter: { prev: "Předchozí", next: "Další" },
  footer: { copyright: "Copyright © 2026 mattheroit" },
  darkModeSwitchLabel: "Vzhled",
  darkModeSwitchTitle: "Přepnout na tmavý režim",
  lightModeSwitchTitle: "Přepnout na světlý režim",

  returnToTopLabel: "Vrátit na začátek",
  langMenuLabel: "Jazyk",
  skipToContentLabel: "Přeskočit k obsahu",

  notFound: {
    title: "Stránka nenalezena",
    quote: "Už jseš skoro tam, zachvíli ji najdeš ;)",
    linkLabel: "Na domácí stránku",
    linkText: "Utéct domů"
  }
}

function sidebar(): DefaultTheme.Sidebar {
  return {
    "/cs/asterisk/": [
      { text: "Asterisk", base: "/cs/asterisk/", items: [{ text: "Instalace a základní konfigurace", link: "instalation_and_configuration" }] }
    ]
  }
}
