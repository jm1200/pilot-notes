import { darken, lighten } from "polished";

export const themes = {
  common: {
    colors: {
      lightFontColor: "#d0d0d0",
      darkFontColor: "#404040",
      primary: "#5183f5",
      accentGrey: "#d0d0d0"
    },
    boxShadow:
      "0 8px 16px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.08)",

    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, 'Helvetica Neue', sans-serif"
  },
  light: {
    type: "light",
    bgColor: "#FFF",

    alternatesToolBackground: lighten(0.8, "#333"),
    editorBackground: lighten(0.8, "#333"),
    notelistBackground: lighten(0.7, "#333"),
    mainNavBackground: "#333",
    borderColor: darken(0.08, "#333"),
    color: "#404040",
    searchBgColor: "#E4E7EB",
    boxShadow: "0.8rem 0.8rem 1.5rem gray",
    categoryColor: "#999",
    categoryHoverColor: "#333"
  },
  dark: {
    bgColor: "#000",
    type: "dark",
    alternatesToolBackground: darken(0.2, "#333"),
    editorBackground: darken(0.08, "#333"),
    notelistBackground: darken(0.04, "#333"),
    mainNavBackground: "#333",
    borderColor: darken(0.08, "#333"),
    color: "#d0d0d0",
    searchBgColor: "#E4E7EB",
    boxShadow: "0.4rem 0.4rem 1.5rem #111111",
    categoryColor: "#CBD2D9",
    categoryHoverColor: "#9AA5B1"
  }
};

export const forms = {
  display: "block",
  borderRdius: "4px",
  border: "1px solid $accent-gray",
  padding: "0.75rem",
  outline: "none",
  marginBottom: "0.5rem",
  fontSize: "1rem",
  width: "100%",
  maxWidth: "100%"
};

export const formsFocus = {
  outline: "0",
  border: `1px solid ${lighten(0.15, themes.common.colors.primary)}`,
  boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.25)"
};
