import styled from "styled-components";
import { device } from "styles/devices";

export const AlternatesToolContainer = styled.aside`
  position: absolute;
  width: 100%;
  width: 100vw;
  top: 100px;
  left: -500px;
  transition: all 1s ease;
  padding: 10px;

  &.open {
    left: 0px;
    z-index: 7;
  }

  @media ${device.tablet} {
    width: 500px;
  }
`;
