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
  }
}
