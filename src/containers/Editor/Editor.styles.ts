import styled from "styled-components";
import { device } from "styles/devices";

export const EditorContainer = styled.div`
  flex: 0;
  width: 0;
  position: relative;

  &.note-open {
    flex: 1;
    width: 100%;
  }

  background: ${props => props.theme.editorBackground};

  @media ${device.tablet} {
    flex: 1;
  }

  .empty-editor {
    background: ${props => props.theme.editorBackground};
    width: 100%;
    font-size: 2rem;
  }
  .v-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .empty-editor,
  .editor,
  .previewer {
    height: calc(100vh - 60px);

    @media ${device.tablet} {
      height: calc(100vh);
    }
  }
  .editor {
    overflow-y: auto;
  }

  .CodeMirror {
    -webkit-font-smoothing: subpixel-antialiased;
    padding: 1rem;
    height: 100%;
    font-family: Menlo, Monaco, monospace;
    font-weight: 500;
    font-size: 15px;
    line-height: 1.5;
  }

  .CodeMirror-lines {
    padding: 0;
  }

  .CodeMirror-activeline-background {
    background: rgba(0, 0, 0, 0.05) !important;
  }
`;
