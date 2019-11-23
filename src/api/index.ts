import { SettingsState } from "types";

export const saveSettings = (settings: SettingsState) => {
  Promise.resolve(localStorage.setItem("settings", JSON.stringify(settings)));
};

export const requestSettings = async () => {
  try {
    const settings = localStorage.getItem("settings");
    if (settings) {
      return JSON.parse(settings);
    }
  } catch (err) {
    return err.message;
  }
};
