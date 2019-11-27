import styled from "styled-components";
import { device } from "styles/devices";

export const AlternatesToolContainer = styled.aside`
  position: absolute;
  width: 95%;
  top: 100px;
  left: -700px;
  transition: all 1s ease;
  display: flex;
  flex-direction: column;
  z-index: 4;

  background: ${props => props.theme.alternatesToolBackground};
  padding: 20px;
  border: 2px solid darkgray;
  border-radius: 5px;
  overflow-y: scroll;

  &.open {
    left: 10px;
    z-index: 7;
  }

  @media ${device.tablet} {
    width: 450px;
    height: 70%;
    margin-left: 25px;
  }
`;
