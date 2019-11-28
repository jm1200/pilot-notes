import styled from "styled-components";
import { device } from "styles/devices";

export const EditorContainer = styled.div`
  flex: 0;
  width: 0;

  &.note-open {
    flex: 1;
    width: 100%;
  }

  background: ${props => props.theme.editorBackground};

  @media ${device.tablet} {
    flex: 1;
  }
`;
