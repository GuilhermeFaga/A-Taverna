import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import SpellsList from "../common/spells/spellsList";
import SpellDetails from "../common/spells/spellDetails";
import SpellsFilters from "../common/spells/spellsFilters";

const useStyles = makeStyles((theme) => ({
  spellsList: {
    height: "calc(100vh - 64px)",
    paddingBottom: "0 !important",
  },
  test2: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  test: {
    width: "-webkit-fill-available",
    height: "100%",
    position: "absolute",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export default function Spells() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid item xs={2}>
        <SpellsFilters />
      </Grid>
      <Grid item className={classes.spellsList} xs={2}>
        <SpellsList />
      </Grid>
      <Grid item xs={7}>
        <SpellDetails />
      </Grid>
      <Grid item xs={1}>
        <div className={classes.test2}>
          <Paper elevation={3} className={classes.test} square></Paper>
        </div>
      </Grid>
    </React.Fragment>
  );
}
