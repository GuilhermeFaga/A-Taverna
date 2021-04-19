import axios from "axios";
import store from "./store";
import * as actions from "./actionTypes";
import * as endpoints from "./endpoints";
import * as keys from "./storageTypes";
import { checkStorage } from "./storage";
import { makeCancelable } from "./helper";
import * as JsSearch from "js-search";

export const switchTheme = () => ({
  type: actions.SWITCH_THEME,
});

export const fetchSpellsRequest = () => ({
  type: actions.FETCH_SPELLS_REQUEST,
});

export const fetchSpellsSuccess = (spells) => ({
  type: actions.FETCH_SPELLS_SUCCESS,
  payload: {
    data: spells,
  },
});

export const fetchSpellsError = (error) => ({
  type: actions.FETCH_SPELLS_ERROR,
});

export const fetchSpells = () => (dispatch) => {
  dispatch(fetchSpellsRequest());
  if (checkStorage(keys.SPELLS)) return;
  axios
    .get(endpoints.spells)
    .then((response) => dispatch(fetchSpellsSuccess(response.data)))
    .catch((error) => dispatch(fetchSpellsSuccess(error.message)));
};

export const spellSelected = (spell) => ({
  type: actions.SPELL_SELECTED,
  payload: {
    id: spell.spell_id,
  },
});

export const filterSpellsStart = (promise, query) => ({
  type: actions.SPELL_FILTER_START,
  payload: {
    promise: promise,
    query: query,
  },
});

export const filterSpellsEnd = (data) => ({
  type: actions.SPELL_FILTER_END,
  payload: {
    data: data,
  },
});

export const filterSpells = (query) => (dispatch) => {
  const myPromise = makeCancelable(
    new Promise((resolve, reject) => {
      const spells = store.getState().spells.data;

      var search = new JsSearch.Search("spell_id");

      search.addIndex("name");
      search.addIndex("type");
      search.addIndex("description");
      search.addDocuments(spells);

      resolve(search.search(query));
    })
  );

  dispatch(filterSpellsStart(myPromise, query));

  myPromise.promise
    .then((data) => {
      const filtered = store.getState().spells_filter.data;
      if (JSON.stringify(data) !== JSON.stringify(filtered))
        dispatch(filterSpellsEnd(data));
    })
    .catch(() => {});
};

export const spellsScrollBottom = () => ({
  type: actions.SPELLS_SCROLL_BOTTOM,
});

export const changePath = (path) => ({
  type: actions.CHANGE_PATH,
  payload: {
    path: path,
  },
});
