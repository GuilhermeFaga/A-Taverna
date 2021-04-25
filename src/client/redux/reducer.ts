import { createAction, createReducer } from "@reduxjs/toolkit";
import { makeCancelable } from "util/helper";
import { initialTheme } from "util/themes";
import { Spell } from "util/types";

const spells: {
  selected: Spell | null;
  data: Array<Spell>;
} = {
  selected: null,
  data: [],
};

const initialState = {
  spells: spells,
  class_spells: {
    loading: true,
    selected: [],
    data: [],
  },
  spells_filter: {
    data: [],
    query: "",
  },
  promises: {
    spells_filter: makeCancelable(null),
  },
  ui: {
    theme: initialTheme,
  },
  user: {},
};

export const spellsLoaded = createAction<any>("spells/loaded");

export const spellSelected = createAction<any>("spells/selected");

export const filterSpellsStart = createAction<any, string>(
  "spells/filter-start"
);

export const filterSpellsEnd = createAction<any>("spells/filter-end");

export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(spellsLoaded, (state, action) => {
      state.spells.data = action.payload;
    })
    .addCase(spellSelected, (state, action) => {
      state.spells.selected = action.payload;
    })
    .addCase(filterSpellsStart, (state, action) => {
      if (state.promises.spells_filter) state.promises.spells_filter.cancel();
      state.promises.spells_filter = action.payload.promise;
      state.spells_filter.query = action.payload.query;
    })
    .addCase(filterSpellsEnd, (state, action) => {
      state.spells_filter.data = action.payload;
    });
});
