import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import Header from "./header";
import Spells from "./spells";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export default function Main() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Header />
      <Grid container className={classes.container} spacing={3}>
        <Switch>
          <Route path="/" component={Spells} />
        </Switch>
      </Grid>
    </React.Fragment>
  );
}