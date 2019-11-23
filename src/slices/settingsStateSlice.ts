import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SettingsState, AppThunk } from "types";
import { initialSettingsState } from "constants/initialStates";
import { requestSettings } from "api";

const settingsStateSlice = createSlice({
  name: "settingsState",
  initialState: initialSettingsState,
  reducers: {
    _loadSettings(state: SettingsState) {
      state.loading = true;
    },
    _loadSettingsSuccess: (
      state: SettingsState,
      action: PayloadAction<SettingsState>
    ) => ({
      ...action.payload,
      loading: false
    }),
    _loadSettingsError(state: SettingsState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateCodeMirrorOptions: (
      state,
      { payload }: PayloadAction<{ key: string; value: string }>
    ) => ({
      ...state,
      codeMirrorOptions: {
        ...state.codeMirrorOptions,
        [payload.key]: payload.value
      }
    }),
    togglePreviewMarkdown: (state: SettingsState) => {
      const newState = {
        ...state,
        previewMarkdown: !state.previewMarkdown
      };
      console.log("toggle", newState);
      return newState;
    },

    toggleDarkTheme: (state: SettingsState) => {
      console.log("toggledarkthem reducer");
      return {
        ...state,
        darkTheme: !state.darkTheme
      };
    }
  }
});

export const {
  _loadSettings,
  _loadSettingsError,
  _loadSettingsSuccess,
  togglePreviewMarkdown,
  toggleDarkTheme,
  updateCodeMirrorOptions
} = settingsStateSlice.actions;

export default settingsStateSlice.reducer;

export const fetchSettings = (): AppThunk => async dispatch => {
  dispatch(_loadSettings());
  try {
    const settings = await requestSettings();
    console.log("loaded settings from local storage", settings);
    dispatch(_loadSettingsSuccess(settings));
  } catch (err) {
    dispatch(_loadSettingsError(err.message));
  }
};
