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
  align-items: center;
  z-index: 4;
  height: 50%;

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
`;

export const AltToolsForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;

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
  font-size: 0.5rem;
  width: 90%;
  margin: 1rem auto 0 auto;
  display: flex;
  justify-content: space-around;

  p {
    margin: 0;
  }
`;

export const AltToolsTable = styled.table`
  width: 95%;
  margin-top: 2rem;

  thead {
    margin-bottom: 14rem;
    padding: 30px;
    font-size: 1.1rem;
  }
  tbody {
    tr {
      text-align: center;
    }
  }

  tbody::before {
    content: "";
    display: block;
    height: 15px;
  }
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
