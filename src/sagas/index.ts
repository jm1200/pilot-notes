import { all, put, takeLatest, select } from "redux-saga/effects";
import moment from "moment";
import {
  saveSettings,
  requestSettings,
  requestNotes,
  saveState,
  requestCategories
} from "api";
import {
  toggleDarkTheme,
  togglePreviewMarkdown,
  updateCodeMirrorOptions,
  _loadSettingsSuccess,
  loadSettingsError,
  _loadSettings
} from "slices/settingsStateSlice";
import {
  loadNotes,
  loadNotesError,
  loadNotesSuccess
} from "slices/noteStateSlice";
import {
  syncStateError,
  syncStateSuccess,
  syncState
} from "slices/appStateSlice";
import {
  loadCategories,
  loadCategoriesError,
  loadCategoriesSuccess
} from "slices/categoryStateSlice";
import { SyncStateAction } from "types";
import { getSettings } from "selectors";
import seedData from "data/seed";

function* syncSettings() {
  try {
    const settings = yield select(getSettings);
    yield saveSettings(settings);
  } catch (err) {
    console.log("error while saving settings", err);
  }
}

function* postState({ payload }: SyncStateAction) {
  try {
    yield saveState(payload);

    yield put(syncStateSuccess(moment().format()));
  } catch (err) {
    yield put(syncStateError(err.message));
  }
}

function* fetchSettings() {
  try {
    const settings = yield requestSettings();
    if (settings) {
      yield put(_loadSettingsSuccess(JSON.parse(settings)));
    } else {
      yield put(
        loadSettingsError("could not load settings from local storage")
      );
    }
  } catch (err) {
    yield put(loadSettingsError(err.message));
  }
}

function* fetchNotes() {
  try {
    const notes = requestNotes();
    if (notes) {
      yield put(loadNotesSuccess(notes));
    } else {
      yield put(loadNotesSuccess(seedData.notes));
    }
  } catch (err) {
    yield put(loadNotesError(err.message));
  }
}

function* fetchCategories() {
  try {
    const categories = requestCategories();
    console.log();
    if (categories) {
      yield put(loadCategoriesSuccess(categories));
    } else {
      yield put(loadCategoriesSuccess(seedData.categories));
    }
  } catch (err) {
    yield put(loadCategoriesError(err.message));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(_loadSettings.type, fetchSettings),
    takeLatest(loadNotes.type, fetchNotes),
    takeLatest(loadCategories.type, fetchCategories),
    takeLatest(syncState.type, postState),
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
