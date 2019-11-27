import styled from "styled-components";
import { device } from "styles/devices";

export const NoteListContainer = styled.div`
  flex: 1;
  width: 100%;

  @media ${device.tablet} {
    flex: 0 0 300px;
  }
`;
