import React from "react";
import {
  LandingPageContainer,
  NavBar,
  Brand,
  Menu,
  Content,
  SubTitle,
  Features
} from "./LandingPage.styles";
import logo from "assets/logo.png";

interface ILandingPageProps {}

const LandingPage: React.FC<ILandingPageProps> = props => {
  return (
    <LandingPageContainer>
      <NavBar>
        <Brand>
          <img src={logo} alt="Pilot Notes" />
        </Brand>
        <Menu>
          <a href="https://google.com">GitHub</a>

          <button>Sign In</button>
        </Menu>
      </NavBar>
      <Content>
        <h1>The Note-Taking App for Pilots</h1>
        <SubTitle>
          Pilot Notes is a free note-taking app tailored to the needs of
          commercial airline pilots.
        </SubTitle>
        <div>
          <img src={logo} alt="TakeNote App" className="app-screenshot" />
        </div>
      </Content>
      <Features>
        <div>
          <h2>Route Notes</h2>
          <p>
            An organised structure to keep track of things to remember on
            specific routes during all phases of your flight.
          </p>
        </div>
        <div>
          <h2>Alternate Strings</h2>
          <p>
            Keep track of your most used alternates on your routes. Copy and
            paste alternates into Jepp
          </p>
        </div>
        <div>
          <h2>Tools</h2>
          <p>
            Useful Tools, like an Alternate look up table to compare ICAO vs
            IATA airport codes with their actual names and even their
            classification
          </p>
        </div>
        <div>
          <h2>Organise</h2>
          <p>
            Keep your study notes and cheat sheets organised with your own file
            structure
          </p>
        </div>
      </Features>
    </LandingPageContainer>
  );
};

export default LandingPage;
