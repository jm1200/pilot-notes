import styled from "styled-components";
import { device } from "styles/devices";
import { lighten } from "polished";

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

export const Previewer = styled.div`
  position: relative;
  max-height: calc(100vh);
  overflow-y: auto;

  background: ${props => props.theme.editorBackground};
  color: ${props => props.theme.color};
  padding: 1rem;

  a {
    color: ${props =>
      props.theme.type === "dark"
        ? props.theme.previewer.tag
        : props.theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  p,
  ol,
  ul,
  dl,
  table {
    font-size: 1rem;
    line-height: 1.5;
    margin: 0 0 1.5rem 0;
  }

  ul li ul {
    margin-bottom: 0;
  }

  ol li ol {
    margin-bottom: 0;
  }

  ul li [type="checkbox"] {
    margin-right: 0.75rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0 0 1.5rem 0;
    font-weight: 700;
    line-height: 1.2;
    color: ${props =>
      props.theme.type === "dark"
        ? props.theme.previewer.attribute
        : "inherit"};

    &:not(:first-child) {
      margin: 1.5rem 0;
    }
  }

  // Increased margin on additional headings
  h1:not(:first-child),
  h2:not(:first-child),
  h3:not(:first-child) {
    margin-top: 2rem;
  }

  // Heading individual styles
  h1 {
    font-size: 1.8rem;
  }

  h2 {
    font-size: 1.6rem;
  }

  h3 {
    font-size: 1.4rem;
  }

  h4 {
    font-size: 1.2rem;
  }

  h5 {
    font-size: 1rem;
  }

  // Blockquote
  blockquote {
    margin: 0 0 1.5rem 0;
    border-left: 4px solid
      ${props => props.theme.color && lighten(0.1, props.theme.color)};
    padding: 0.5rem 1.5rem;

    p {
      font-size: 1.1rem;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    cite {
      display: block;
      margin-top: 1.5rem;
      font-size: 1rem;
      text-align: right;
    }
  }

  // Code block styling
  pre {
    border: 0;
    border-radius: 4px;
    background: ${props => props.theme.notelistBackground};
    padding: 1rem;
    tab-size: 2;
    color: #404040;
    margin: 0 0 1.5rem 0;
    white-space: pre-wrap;
    word-spacing: normal;
    word-break: normal;

    code {
      padding: 0;
      background: transparent;
      line-height: 1.2;
    }
  }

  code {
    padding: 2px 4px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.08);
  }

  hr {
    height: 0;
    border: 0;
    border-top: 2px solid
      ${props => props.theme.color && lighten(0.1, props.theme.color)};
  }

  img {
    max-width: 100%;
    max-height: 20rem;
    object-fit: cover;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    max-width: 100%;
  }

  thead th {
    border-bottom: 2px solid ${props => props.theme.notelistBackground};
  }

  tfoot th {
    border-top: 2px solid ${props => props.theme.notelistBackground};
  }

  td {
    border-bottom: 1px solid ${props => props.theme.notelistBackground};
  }

  th,
  td {
    text-align: left;
    padding: 0.5rem;
  }
`;
