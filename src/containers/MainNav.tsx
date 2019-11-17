import React from "react";
import { Sun, Moon, Globe, Plus } from "react-feather";
import MainNavActionButton from "components/MainNavActionButton";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleDarkTheme,
  updateCodeMirrorOptions,
  toggleAlternatesTool
} from "slices/appStateSlice";
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

  const toggleAlternates = () => {
    dispatch(toggleAlternatesTool());
  };

  return (
    <aside className="main-nav">
      <section className="main-nav-actions">
        <MainNavActionButton
          handler={toggleAlternates}
          icon={Plus}
          label={"Add Note"}
        />
        <MainNavActionButton
          handler={toggleAlternates}
          icon={Globe}
          label={"Alternates Tool"}
        />
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
      </section>
      <section className="main-nav-body"></section>
      <section className="main-nav-synced">Sync</section>
      <h4>Main Nav</h4>
    </aside>
  );
};

export default MainNav;
