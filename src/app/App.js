import { ThemeProvider } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import LayoutGrid from "../features/layoutGrid";
import { getTheme, getThemeObject } from "./themes";

export default function App() {
  const theme = getThemeObject(useSelector(getTheme));

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: theme.palette.secondary.main }}>
        <LayoutGrid />
      </div>
    </ThemeProvider>
  );
}
