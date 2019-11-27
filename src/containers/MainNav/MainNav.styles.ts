import styled from "styled-components";
import { device } from "styles/devices";

export const MainNavContainer = styled.aside`
  flex: 0;
  width: 0;
  transition: all 1s ease;
  overflow: hidden;
  z-index: 4;

  background: ${props => props.theme.mainNavBackground};

  &.open {
    flex: 0 0 200px;
  }

  @media ${device.tablet} {
    flex: 0 0 200px;
  }
`;
