import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  header: {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 99,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function Header(props) {
  const classes = useStyles();

  return <div className={classes.header}></div>;
}
