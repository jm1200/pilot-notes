import styled from "styled-components";
import { device } from "../../styles/devices";

export const SignInModalContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin-top: -16px;
  background-color: rgb(0, 0, 0, 0.8);
  color: ${props => props.theme.color};
`;

export const SignInFormContainer = styled.div`
  position: relative;
  width: 90%;
  margin: 20px auto;
  padding: 20px;
  background-color: ${props => props.theme.editorBackground};
  border-radius: 5px;

  @media ${device.tablet} {
    width: 600px;
    margin: 50px auto;
  }
  .close {
    position: absolute;
    right: 7px;
    top: 7px;
  }
`;
export const ErrorMsg = styled.div`
  color: red;
`;
