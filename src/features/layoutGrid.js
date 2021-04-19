import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import SpellsGrid from "../common/spells/spellsGrid";
import SpellDetails from "../common/spells/spellDetails";
import SpellsSearch from "../common/spells/spellsSearch";
import Header from "./header";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "start",
    },
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

export default function LayoutGrid() {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Header />

      <Grid item className={classes.leftPanel} xl={3} lg={2} md={1}>
        {/* Left side */}
      </Grid>
      <Grid item className={classes.middlePanel}>
        <SpellsSearch />
        <SpellsGrid />
      </Grid>
      <Grid item className={classes.rightPanel} xl={3} lg={2} md="auto">
        <SpellDetails />
      </Grid>
    </Grid>
  );
}
