import styled from "styled-components";
import { device } from "styles/devices";

export const NoteListContainer = styled.div`
  flex: 1;
  width: 100%;
  transition: all 1s ease;

  background: ${props => props.theme.notelistBackground};

  &.note-open {
    flex: 0;
    width: 0;
  }

  @media ${device.tablet} {
    flex: 0 0 300px;
  }
`;
