import { checkStorage, readFromStorage } from "./storage";
import * as keys from "./storageTypes";
import createMyTheme from "./createMyTheme";

export const lightTheme = createMyTheme({
  palette: {
    type: "light",
    primary: {
      main: "#151515",
    },
    secondary: {
      main: "#FFFFFF",
    },
    background: {
      paper: "#FFFFFF",
      default: "#F5F5F5",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
    contrastText: "#FFFFFF",
  },
  scrollbarStyle: {
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#CECECE",
      borderRadius: 25,
    },
    "&::-webkit-scrollbar": {
      width: 5,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#EBEBEB",
    },
  },
});

const darkTheme = createMyTheme({
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
    },
  },
});

const light = "light";
const dark = "dark";

export const initialTheme = checkStorage(keys.THEME)
  ? readFromStorage(keys.THEME)
  : light;

export const swapThemes = (theme: string) => (theme === dark ? light : dark);

// export const getTheme = (state) => state.ui.theme;

export const getThemeObject = (theme: string) =>
  theme === dark ? darkTheme : lightTheme;
