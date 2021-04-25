import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { makeCancelable } from "util/helper";
import { filterSpellsEnd, filterSpellsStart, rootReducer } from "./reducer";
import * as JsSearch from "js-search";

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ["spells/filter-start"],
      // Ignore these field paths in all actions
      ignoredActionPaths: ["payload.promise"],
      // Ignore these paths in the state
      ignoredPaths: ["promises.spells_filter"],
    },
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const filterSpells = (query: string) => (dispatch: AppDispatch) => {
  const myPromise = makeCancelable(
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const spells = store.getState().spells.data;
        console.log(spells);
        var search = new JsSearch.Search("id");

        search.addIndex("name");
        search.addIndex("type");
        search.addIndex("description");
        search.addDocuments(spells);

        console.log(query);
        console.log(search.search(query));

        resolve(search.search(query));
      }, 100);
    })
  );

  dispatch(filterSpellsStart({ promise: myPromise, query: query }));
  if (myPromise)
    myPromise.promise
      .then((data) => {
        const filtered = store.getState().spells_filter.data;
        if (JSON.stringify(data) !== JSON.stringify(filtered))
          dispatch(filterSpellsEnd(data));
      })
      .catch(() => {});
};
