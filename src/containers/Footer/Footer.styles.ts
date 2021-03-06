import styled from "styled-components";
import { device } from "styles/devices";

export const FooterContainer = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 75px;
  z-index: 3;
  background: ${props => props.theme.mainNavBackground};
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media ${device.tablet} {
    display: none;
  }
`;
