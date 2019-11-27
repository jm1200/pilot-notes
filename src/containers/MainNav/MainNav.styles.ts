import styled from "styled-components";
import { device } from "styles/devices";

export const MainNavContainer = styled.aside`
  flex: 0;

  @media ${device.tablet} {
    flex: 0 0 200px;
  }
`;
