import styled from "styled-components";
import { device } from "styles/devices";
import { lighten } from "polished";

export const LandingPageContainer = styled.div`
  width: 100%;
  background: ${props =>
    props.theme.colors.accentGrey &&
    lighten(0.15, props.theme.colors.accentGrey)};
  overflow: scroll;
`;

export const NavBar = styled.div`
  width: 100%;
  height: 80px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  @media ${device.tablet} {
    padding: 0 2.5rem;
  }
`;

export const Brand = styled.div`
  img {
    width: 185px;
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;

  a {
    font-size: 1.1rem;
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
    text-decoration: none;
    margin-right: 1rem;
  }
`;

export const Content = styled.div`
  padding: 3rem;
  width: 100%;

  h1 {
    color: ${props => props.theme.colors.darkFontColor};
    text-align: center;
    font-weight: 600;
    font-size: 2rem;

    @media ${device.tablet} {
      font-size: 2.6rem;
    }
  }
  div {
    width: 75%;
    margin: 0 auto;
    padding-top: 30px;
    .app-screenshot {
      width: 100%;
    }
  }
`;
export const SubTitle = styled.p`
  color: ${props =>
    props.theme.colors.darkFontColor &&
    lighten(0.1, props.theme.colors.darkFontColor)};
  font-size: 1.2rem;
  margin: 1rem auto 1.5rem;
  text-align: center;

  @media ${device.tablet} {
    line-height: 1.6;
    font-size: 1.3rem;
  }
`;
export const Features = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 0;
  display: flex;
  flex-wrap: wrap;

  div {
    padding: 0 0.5rem;

    @media ${device.tablet} {
      padding: 0 1rem;
      flex: 1 1 50%;
    }

    h2 {
      font-weight: 600;
      font-size: 1.6rem;
      color: ${props => props.theme.colors.darkFontColor};
      margin: 2rem 0;
    }

    p {
      line-height: 1.6;
      color: ${props =>
        props.theme.colors.darkFontColor &&
        lighten(0.15, props.theme.colors.darkFontColor)};
    }
  }
`;
