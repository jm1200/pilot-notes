import { all, put, takeLatest, select } from "redux-saga/effects";
import moment from "moment";
import { saveSettings, requestSettings } from "api";
import {
  toggleDarkTheme,
  togglePreviewMarkdown,
  updateCodeMirrorOptions,
  _loadSettingsSuccess,
  _loadSettingsError,
  _loadSettings
} from "slices/settingsStateSlice";
import { RootState } from "types";

const getSettings = (state: RootState) => state.settingsState;

function* syncSettings() {
  console.log("Syncing Settings");

  try {
    const settings = yield select(getSettings);
    yield saveSettings(settings);
  } catch {}
}

function* fetchSettings() {
  console.log("fetching Settings");
  try {
    const settings = yield requestSettings();
    console.log("These are the setting from localStorage: ", settings);
    yield put(_loadSettingsSuccess(settings));
  } catch (err) {
    yield put(_loadSettingsError(err.message));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(_loadSettings.type, fetchSettings),
    takeLatest(
      [
        toggleDarkTheme.type,
        togglePreviewMarkdown.type,
        updateCodeMirrorOptions.type
      ],
      syncSettings
    )
  ]);
}

export default rootSaga;
