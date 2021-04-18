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
    filter: {
      loading: false,
      data: [],
    },
  },
  ui: {
    theme: initialTheme,
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
