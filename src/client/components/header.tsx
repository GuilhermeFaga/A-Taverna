import GithubButton from "./githubButton";
// import SpellsSearch from "./spellsSearch";
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";
import HeaderTabs from "./headerTabs";
import styles from "styles/Header.module.css";
import SpellsSearch from "./spellsSearch";
import Link from "next/link";

export const appBarHeight = 64;

export default function Header() {
  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar>
        <Grid container spacing={3}>
          <Grid item className={styles.title} xs={2}>
            <Typography variant="h6" className={styles.title}>
              <Link href="/">A Taverna</Link>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <SpellsSearch />
          </Grid>
          <Grid item xs={8} className={styles.toolbarItens}>
            <HeaderTabs />
            <GithubButton />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
