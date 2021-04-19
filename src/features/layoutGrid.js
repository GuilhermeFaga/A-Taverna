import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
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
  const currentPath = useSelector((state) => state.page.path);

  return (
    <Grid container className={classes.container}>
      <Header />
      <Switch>
        <Route path="/magias" component={Spells} />
      </Switch>
    </Grid>
  );
}
