import { Provider } from "react-redux";
import SpellsContainer from "../features/spellsContainer";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <SpellsContainer />
    </Provider>
  );
}
