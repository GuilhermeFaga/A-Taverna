import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import SpellsList from "../common/spells/spellsList";
import SpellDetails from "../common/spells/spellDetails";
import SpellsSearch from "../common/spells/spellsSearch";

const useStyles = makeStyles((theme) => ({
  leftPanel: {
    marginRight: theme.spacing(8),
    [theme.breakpoints.down("md")]: {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  middlePanel: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(2),
    },
  },
  rightPanel: {
    marginLeft: theme.spacing(8),
    maxHeight: "calc(100% - 96px)",
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(4),
    },
  },
  spellsList: {
    height: "calc(100vh - 56px)",
    paddingBottom: "0 !important",
    // display: "block",
    // flexDirection: "column",
    // height: "100vh",
  },
}));

export default function Spells() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid item xs={2}>
        {/* Filters panel */}
      </Grid>
      <Grid item className={classes.spellsList} xs={2}>
        <SpellsList />
      </Grid>
      <Grid item xs={7}>
        <SpellDetails />
      </Grid>
      <Grid item xs={1}>
        {/* Utility panel */}
      </Grid>
    </React.Fragment>
  );
}
