import styled from "styled-components";
import { darken } from "polished";

export const ActionButton = styled.button`
  padding: 0.7rem;
  margin: 0 0.5rem;
  background: ${props => props.theme.mainNavBackground};
  border: none;
  border-radius: 4px;
  color: ${props =>
    props.theme.colors.lightFontColor &&
    darken(0.1, props.theme.colors.lightFontColor)};

  &:hover {
    background: ${props => props.theme.colors.primary};
    outline: none;

    color: white;
  }

  &:focus {
    outline: none;
    background: ${props => props.theme.mainNavBackground};
  }
`;
