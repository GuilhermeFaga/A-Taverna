import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClassSpellsFilter from "./classSpellsFilter";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "auto",
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
}));

export default function SpellsFilters() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <ClassSpellsFilter />
    </div>
  );
}
