import React from "react";
import { Sun, Moon, Globe } from "react-feather";

interface IMainNavProps {}

const MainNav: React.FC<IMainNavProps> = props => {
  const dark = false;
  return (
    <aside className="main-nav">
      <div className="options-container">
        <div className="options-list">
          <Globe className="options-icon" />
          {dark ? <Sun /> : <Moon />}
        </div>
      </div>
      <h4>Main Nav</h4>
    </aside>
  );
};

export default MainNav;
