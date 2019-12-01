import styled from "styled-components";
import { darken } from "polished";
import { device } from "styles/devices";

export const ActionButton = styled.button`
  padding: 0.7rem;
  margin: 0 0.5rem;
  background: ${props =>
    props.theme.bgColor && darken(0.03, props.theme.mainNavBackground)};
  border: none;
  border-radius: 4px;
  color: ${props => props.theme.colors.lightFontColor};
  @media ${device.tablet} {
    margin: 0.5rem 0.5rem;
  }
  &:hover {
    background: ${props => props.theme.colors.primary};
    outline: none;

    color: white;
  }

  &:focus {
    outline: none;
  }
`;
