import React from "react";
import { Sun, Moon, Globe } from "react-feather";
import MainNavActionButton from "components/MainNavActionButton";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkTheme, updateCodeMirrorOptions } from "slices/appStateSlice";
import { RootState } from "types";

interface IMainNavProps {}

const MainNav: React.FC<IMainNavProps> = props => {
  const dispatch = useDispatch();
  //console.log(dispatch({ type: "test" }));
  const darkTheme = useSelector((state: RootState) => state.appState.darkTheme);

  const toggleTheme = () => {
    dispatch(toggleDarkTheme());
    dispatch(updateCodeMirrorOptions());
  };

  return (
    <aside className="main-nav">
      <div className="options-container">
        <div className="options-list">
          <Globe className="options-icon" />
          {darkTheme ? (
            <MainNavActionButton
              handler={toggleTheme}
              icon={Sun}
              label={"choose theme"}
            />
          ) : (
            <MainNavActionButton
              handler={toggleTheme}
              icon={Moon}
              label={"choose theme"}
            />
          )}
        </div>
      </div>
      <h4>Main Nav</h4>
    </aside>
  );
};

export default MainNav;
