import { AppProps } from "next/app";
import { Grid, ThemeProvider, Toolbar } from "@material-ui/core";
import styles from "../styles/App.module.css";
import "../styles/globals.css";
import Header from "../components/header";
import { lightTheme } from "../util/themes";
import { Provider } from "react-redux";
import { store } from "redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <Header />
        <Toolbar />
        <Grid container className={styles.container}>
          <Component {...pageProps} />
        </Grid>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
