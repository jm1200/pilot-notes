import { createGlobalStyle } from "styled-components";
import { lighten } from "polished";

export const GlobalStyle = createGlobalStyle`
 *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body {
        height: 100vh;
        max-width: 100%;
        font-size: 1rem;
        background-color: ${props => props.theme.bgColor};
        color: ${props => props.theme.color};
        font-family: ${props => props.theme.fontFamily};
    }
    /* input, input:before, input:after {
      -webkit-user-select: initial;
      -khtml-user-select: initial;
      -moz-user-select: initial;
      -ms-user-select: initial;
      user-select: initial;
     }  */

    [type='text'], [type='search'] {
        display: block;
        border-radius: 4px;
        border: 1px solid ${props => props.theme.colors.accentGrey};
        padding: 0.75rem;
        outline: none;
        margin-bottom: 0.5rem;
        font-size: 1rem;
        width: 100%;
        max-width: 100%;

        &:focus, &:active {
            outline: 0;
            border: 1px solid ${props =>
              props.theme.colors.primary &&
              lighten(0.15, props.theme.colors.primary)};
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
    }

    .button, a.button, button, [type=submit], [type=reset], [type=button] {
        background: ${props => props.theme.colors.primary};
        border: 2px solid ${props => props.theme.colors.primary};
        border-radius: 4px;
        color: white;
        font-weight: 600;
        font-size: 1rem;
        padding: 0.75rem 1.25rem;
        margin: 0 0 0.5rem 0;
        vertical-align: middle;
        text-align: center;
        cursor: pointer;
        text-decoration: none;
        line-height: 1;
}
        
    

  

`;
