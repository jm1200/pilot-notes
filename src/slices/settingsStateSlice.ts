import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SettingsState } from "types";

export const initialSettingsState: SettingsState = {
  previewMarkdown: true,
  darkThemeSetting: true,
  loading: false,
  error: "",
  codeMirrorOptions: {
    mode: "gfm",
    theme: "new-moon",
    lineNumbers: false,
    lineWrapping: true,
    styleActiveLine: { nonEmpty: true },
    viewportMargin: Infinity,
    keyMap: "default",
    dragDrop: false
  }
};

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
      loading: false,
      error: ""
    }),
    loadSettingsError: (
      state: SettingsState,
      action: PayloadAction<string>
    ) => {
      console.log("Error: ", action.payload);
      return { ...state, loading: false, error: action.payload };
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
      return newState;
    },
    setPreviewMarkdown: (
      state: SettingsState,
      action: PayloadAction<boolean>
    ) => {
      const mode = action.payload;
      return {
        ...state,
        previewMarkdown: mode
      };
    },

    toggleDarkTheme: (state: SettingsState) => {
      return {
        ...state,
        darkThemeSetting: !state.darkThemeSetting
      };
    }
  }
});

export const {
  _loadSettings,
  loadSettingsError,
  _loadSettingsSuccess,
  togglePreviewMarkdown,
  toggleDarkTheme,
  updateCodeMirrorOptions,
  setPreviewMarkdown
} = settingsStateSlice.actions;

export default settingsStateSlice.reducer;
