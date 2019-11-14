import React from "react";
import { Sun, Moon, Globe } from "react-feather";

interface IOptionsProps {}

const Options: React.FC<IOptionsProps> = props => {
  const dark = false;

  return (
    <div className="options-container">
      <div className="options-list">
        <Globe className="options-icon" />
        {dark ? <Sun /> : <Moon />}
      </div>
    </div>
  );
};

export default Options;
