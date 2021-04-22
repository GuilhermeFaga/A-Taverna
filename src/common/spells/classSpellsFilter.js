import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { fetchClassSpells } from "../../app/actions";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ClassButton from "./classButton";

const useStyles = makeStyles((theme) => ({}));

function ClassSpellsFilter({ classSpellsData, fetchClassSpells }) {
  const classes = useStyles();
  const loading = useSelector((state) => state.class_spells.loading);
  const classSpells = classSpellsData.data;

  useEffect(() => {
    fetchClassSpells();
  }, [fetchClassSpells]);

  return (
    <Grid container spacing={2}>
      {classSpells.map((classData) => {
        return <ClassButton key={classData.class} classData={classData} />;
      })}
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  classSpellsData: state.class_spells,
});

const mapDispatchToProps = (dispatch) => ({
  fetchClassSpells: () => dispatch(fetchClassSpells()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassSpellsFilter);
