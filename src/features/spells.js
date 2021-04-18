import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import SpellsGrid from "../common/spellsGrid";

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "center",
    width: "100%",
  },
}));

export default function Spells() {
  const classes = useStyles();

  return (
    <Grid container className={classes.container} spacing={8}>
      <Grid item xs={12}>
        {/* Header */}
      </Grid>

      <Grid item xs={3}>
        {/* Left side */}
      </Grid>
      <Grid item>
        <SpellsGrid />
      </Grid>
      <Grid item xs={3}>
        {/* Right side */}
      </Grid>
    </Grid>
  );
}
