import { DefaultTheme } from "vitepress"

// .vitepress/i18n.ts
export interface Labels {
  lang: String
  siteDescription: String
  nav?: DefaultTheme.NavItem[]
  sidebarMenuLabel?: String
  sidebar?: DefaultTheme.Sidebar
  outline?: String
  editLink?: String
  lastUpdated?: String
  search?: NonNullable<DefaultTheme.LocalSearchOptions["translations"]>
  docFooter?: DefaultTheme.DocFooter
  footer?: DefaultTheme.Footer
  darkModeSwitchLabel?: String
  darkModeSwitchTitle?: String
  lightModeSwitchTitle?: String
  returnToTopLabel?: String
  langMenuLabel?: String
  skipToContentLabel?: String
  notFound?: DefaultTheme.NotFoundOptions
}
