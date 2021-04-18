import axios from "axios";
import * as actions from "./actionTypes";
import * as endpoints from "./endpoints";
import * as keys from "./storageTypes";
import { checkStorage } from "./storage";

export const actionTemplate = (param) => ({
  type: "",
  payload: {},
});

export const fetchSpellsRequest = () => ({
  type: actions.FETCH_SPELLS_REQUEST,
  payload: {},
});

export const fetchSpellsSuccess = (spells) => ({
  type: actions.FETCH_SPELLS_SUCCESS,
  payload: {
    data: spells,
  },
});

export const fetchSpellsError = (error) => ({
  type: actions.FETCH_SPELLS_ERROR,
  payload: {},
});

export const fetchSpells = () => (dispatch) => {
  dispatch(fetchSpellsRequest());
  if (checkStorage(keys.SPELLS)) return;
  axios
    .get(endpoints.spells)
    .then((response) => dispatch(fetchSpellsSuccess(response.data)))
    .catch((error) => dispatch(fetchSpellsSuccess(error.message)));
};
