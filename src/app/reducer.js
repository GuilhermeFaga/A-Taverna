import * as actions from "./actionTypes";
import * as keys from "./storageTypes";
import { checkStorage, writeToStorage, readFromStorage } from "./storage";
import { initialTheme, swapThemes } from "./themes";
import produce from "immer";

const initialState = {
  spells: {
    loading: false,
    selectedId: null,
    data: [],
  },
  spells_filter: {
    data: [],
    query: "",
    currentPageSize: 27,
    pageSize: 27,
  },
  promises: {
    spells_filter: null,
  },
  ui: {
    theme: initialTheme,
  },
  page: {
    path: window.location.pathname,
  },
  user: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SWITCH_THEME:
      return switchTheme(state, action);
    case actions.FETCH_SPELLS_REQUEST:
      return fetchSpellsRequest(state, action);
    case actions.FETCH_SPELLS_SUCCESS:
      return fetchSpellsSuccess(state, action);
    case actions.FETCH_SPELLS_ERROR:
      return fetchSpellsError(state, action);
    case actions.SPELL_SELECTED:
      return spellSelected(state, action);
    case actions.SPELL_FILTER_START:
      return spellFilterStart(state, action);
    case actions.SPELL_FILTER_END:
      return spellFilterEnd(state, action);
    case actions.SPELLS_SCROLL_BOTTOM:
      return spellsScrollBottom(state, action);
    case actions.CHANGE_PATH:
      return changePath(state, action);
    default:
      return state;
  }
}

const switchTheme = (state, action) =>
  produce(state, (draftState) => {
    const nextTheme = swapThemes(state.ui.theme);
    draftState.ui.theme = nextTheme;
    writeToStorage(keys.THEME, nextTheme);
  });

const fetchSpellsRequest = (state, action) =>
  produce(state, (draftState) => {
    if (checkStorage(keys.SPELLS))
      draftState.spells.data = readFromStorage(keys.SPELLS);
    else draftState.spells.loading = true;
  });

const fetchSpellsSuccess = (state, action) =>
  produce(state, (draftState) => {
    draftState.spells.loading = false;
    draftState.spells.data = action.payload.data;
    writeToStorage(keys.SPELLS, action.payload.data);
  });

const fetchSpellsError = (state, action) =>
  produce(state, (draftState) => {
    draftState.spells.loading = false;
  });

const spellSelected = (state, action) =>
  produce(state, (draftState) => {
    draftState.spells.selectedId = action.payload.id;
  });

const spellFilterStart = (state, action) =>
  produce(state, (draftState) => {
    if (state.promises.spells_filter) state.promises.spells_filter.cancel();
    draftState.promises.spells_filter = action.payload.promise;
    draftState.spells_filter.query = action.payload.query;
  });

const spellFilterEnd = (state, action) =>
  produce(state, (draftState) => {
    draftState.spells_filter.currentPageSize = state.spells_filter.pageSize;
    draftState.spells_filter.data = action.payload.data;
  });

const spellsScrollBottom = (state, action) =>
  produce(state, (draftState) => {
    draftState.spells_filter.currentPageSize += state.spells_filter.pageSize;
  });

const changePath = (state, action) =>
  produce(state, (draftState) => {
    draftState.page.path = action.payload.path;
  });
