import { ThemeProvider } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import SpellsContainer from "../features/spellsContainer";
import { getTheme, getThemeObject } from "./themes";

export default function App() {
  const theme = getThemeObject(useSelector(getTheme));

  return (
    <ThemeProvider theme={theme}>
      <SpellsContainer />
    </ThemeProvider>
  );
}
