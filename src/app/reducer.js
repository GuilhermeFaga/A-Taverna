import * as actions from "./actionTypes";
import * as keys from "./storageTypes";
import { checkStorage, writeToStorage, readFromStorage } from "./storage";
import produce from "immer";

const initialState = {
  spells: {
    loading: false,
    data: [],
  },
  ui: {},
  user: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_SPELLS_REQUEST:
      return produce(state, (draftState) => {
        if (checkStorage(keys.SPELLS))
          draftState.spells.data = readFromStorage(keys.SPELLS);
        else draftState.spells.loading = true;
      });
    case actions.FETCH_SPELLS_SUCCESS:
      return produce(state, (draftState) => {
        draftState.spells.loading = false;
        draftState.spells.data = action.payload.data;
        writeToStorage(keys.SPELLS, action.payload.data);
      });
    case actions.FETCH_SPELLS_ERROR:
      return produce(state, (draftState) => {
        draftState.spells.loading = false;
      });
    default:
      return state;
  }
}
