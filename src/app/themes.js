import { createMuiTheme } from "@material-ui/core/styles";
import { checkStorage, readFromStorage } from "./storage";
import * as keys from "./storageTypes";

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    teste: "#2F93E0",
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    teste: "#F44336",
  },
});

const light = "light";
const dark = "dark";

export const initialTheme = checkStorage(keys.THEME)
  ? readFromStorage(keys.THEME)
  : light;

export const swapThemes = (theme) => (theme === dark ? light : dark);

export const getTheme = (state) => state.ui.theme;

export const getThemeObject = (theme) =>
  theme === dark ? darkTheme : lightTheme;
