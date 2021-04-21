import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import SpellsGrid from "../common/spells/spellsGrid";
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
}));

export default function Spells() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid item className={classes.leftPanel} xl={3} lg={3} md={1}>
        {/* Left side */}
      </Grid>
      <Grid item className={classes.middlePanel}>
        <SpellsSearch />
        <SpellsGrid />
      </Grid>
      <Grid item className={classes.rightPanel} xl={3} lg={3} md="auto">
        <SpellDetails />
      </Grid>
    </React.Fragment>
  );
}
