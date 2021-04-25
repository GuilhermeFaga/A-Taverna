import { Grid, Toolbar } from "@material-ui/core";
import CustomHead from "components/customHead";
import Head from "next/head";
import styles from "styles/Home.module.css";

export default function Home() {
  return (
    <>
      <CustomHead />

      <Grid item xs={12}>
        <h1 className={styles.title}>Bem Vindo à A Taverna</h1>
        <p className={styles.description}>Site em desenvolvimento</p>
      </Grid>
    </>
  );
}
