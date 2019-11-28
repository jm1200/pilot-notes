import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fontFamily: string;
    type: string;
    bgColor: string;
    color: string;
    searchBgColor: string;
    boxShadow: string;
    categoryColor: string;
    categoryHoverColor: string;
    alternatesToolBackground: string;
    editorBackground: string;
    notelistBackground: string;
    mainNavBackground: string;
    borderColor: string;

    colors: {
      lightFontColor: string;
      darkFontColor: string;
      primary: string;
      accentGrey: string;
    };
  }
}
