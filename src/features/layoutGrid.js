import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import Header from "./header";
import Spells from "./spells";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "start",
    },
  },
}));

export default function LayoutGrid() {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Header />
      <Switch>
        <Route path="/" component={Spells} />
      </Switch>
    </Grid>
  );
}
