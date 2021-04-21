import { ThemeProvider } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Main from "../features/main";
import { getTheme, getThemeObject } from "./themes";

export default function App() {
  const theme = useSelector(getTheme);

  return (
    <ThemeProvider theme={getThemeObject(theme)}>
      <Main />
    </ThemeProvider>
  );
}
