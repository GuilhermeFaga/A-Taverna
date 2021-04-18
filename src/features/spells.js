import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import SpellsGrid from "../common/spellsGrid";
import SpellDetails from "../common/spellDetails";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "start",
    },
  },
  header: {
    marginBottom: theme.spacing(8),
  },
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
    maxHeight: "calc(100vw - 64px)",
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(4),
    },
  },
}));

export default function Spells() {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.header} xs={12}>
        {/* Header */}
      </Grid>

      <Grid item className={classes.leftPanel} xl={3} lg={2} md={1}>
        {/* Left side */}
      </Grid>
      <Grid item className={classes.middlePanel}>
        <SpellsGrid />
      </Grid>
      <Grid item className={classes.rightPanel} xl={3} lg={2} md="auto">
        <SpellDetails />
      </Grid>
    </Grid>
  );
}
