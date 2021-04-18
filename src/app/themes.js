import { createMuiTheme } from "@material-ui/core/styles";
import { checkStorage, readFromStorage } from "./storage";
import * as keys from "./storageTypes";

const customBreakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 1150,
    lg: 1400,
    xl: 1920,
  },
};

const lightTheme = createMuiTheme({
  breakpoints: customBreakpoints,
  palette: {
    type: "light",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#FFFFFF",
    },
    text: {
      primary: "#000000",
      secondary: "#FFFFFF",
      gray: "#CCCCCC",
    },
    teste: "#2F93E0",
  },
});

const darkTheme = createMuiTheme({
  breakpoints: customBreakpoints,
  palette: {
    type: "dark",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#000000",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#000000",
      gray: "#666666",
    },
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
