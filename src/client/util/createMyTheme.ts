import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeOptions } from "@material-ui/core/styles";
import {
  Palette,
  PaletteColor,
  PaletteOptions,
} from "@material-ui/core/styles/createPalette";

const customBreakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 1150,
    lg: 1400,
    xl: 1920,
  },
};

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    contrastText: string;
  }
  interface PaletteOptions {
    contrastText?: string;
  }
}

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    palette: Palette;
    scrollbarStyle: {
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: React.CSSProperties["color"];
        borderRadius: number;
      };
      "&::-webkit-scrollbar": {
        width: number;
      };
      "&::-webkit-scrollbar-track": {
        backgroundColor: React.CSSProperties["color"];
      };
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    palette?: PaletteOptions;
    scrollbarStyle?: {
      "&::-webkit-scrollbar-thumb"?: {
        backgroundColor?: React.CSSProperties["color"];
        borderRadius?: number;
      };
      "&::-webkit-scrollbar"?: {
        width?: number;
      };
      "&::-webkit-scrollbar-track"?: {
        backgroundColor?: React.CSSProperties["color"];
      };
    };
  }
}

export default function createMyTheme(options: ThemeOptions) {
  return createMuiTheme({
    breakpoints: customBreakpoints,
    scrollbarStyle: {
      "&::-webkit-scrollbar-thumb": {
        borderRadius: 25,
      },
      "&::-webkit-scrollbar": {
        width: 5,
      },
    },
    ...options,
  });
}
