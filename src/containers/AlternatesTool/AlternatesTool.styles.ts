import styled from "styled-components";
import { device } from "styles/devices";

export const AlternatesToolContainer = styled.aside`
  position: absolute;
  width: 95%;
  top: 100px;
  left: -1000px;
  transition: all 1s ease;
  z-index: 4;
  height: 400px;

  background: ${props => props.theme.editorBackground};
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
    margin-left: 25px;
  }

  h1 {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

export const AltToolsForm = styled.div`
  width: 90%;
  margin: 0 auto;

  .select-container {
    display: flex;
    white-space: nowrap;
    align-items: center;
    margin-top: 1.5rem;
    .alternates-tool-select {
      background: white;
      width: 100%;
      margin-left: 10px;
      outline: none;
    }
  }
  .alternates-tool-input-container {
    margin-top: 1.5rem;
    display: flex;
    white-space: nowrap;

    .alternates-tool-input {
      width: 100%;
      margin-left: 10px;
      outline: none;
      border: 1px solid white;
      border-radius: 2px;
    }
  }
`;

export const AltToolsLegend = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  padding: 15px 0;
  width: 100%;
  font-size: 0.5rem;
  width: 90%;

  p {
    margin: 0;
  }
`;

export const AltToolsTable = styled.table`
  width: 95%;
  margin: 0 auto;
  thead {
    width: 100%;
    font-size: 1.1rem;

    tr {
      width: 100%;
      margin-bottom: 15px;
    }
  }
  tbody {
    width: 100%;
    tr {
      width: 100%;

      td {
        text-align: center;
        padding: 5px 0;
      }
    }
  }

  /* tbody::before {
    content: normal;
    height: 15px;
  } */
`;

export const CloseMenu = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 8;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;
