import { makeStyles } from "@material-ui/core/styles";
import GithubButton from "../common/header/githubButton";
import SpellsSearch from "../common/spells/spellsSearch";
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";
import HeaderTabs from "../common/header/headerTabs";

const useStyles = makeStyles((theme) => ({
  title: {
    alignItems: "center",
    display: "flex",
  },
  toolbarItens: {
    alignItems: "center",
    display: "flex",
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static " elevation={0}>
      <Toolbar>
        <Grid container spacing={3}>
          <Grid item className={classes.title} xs={2}>
            <Typography variant="h6" className={classes.title}>
              A Taverna
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <SpellsSearch />
          </Grid>
          <Grid item xs={8} className={classes.toolbarItens} justify="flex-end">
            <HeaderTabs />
            <GithubButton />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
