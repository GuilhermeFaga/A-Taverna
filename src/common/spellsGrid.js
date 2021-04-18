import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchSpells } from "../app/actions";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import SpellCard from "./spellCard";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: 792,
  },
}));

function SpellsGrid({ spellsData, fetchSpells }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    fetchSpells();
  }, [fetchSpells]);

  console.log(spellsData);
  return (
    <Grid container className={classes.grid} spacing={2}>
      {spellsData.data
        ? spellsData.data.map((spell) => (
            <Grid item xs={4} key={spell.name}>
              <SpellCard spell={spell} />
            </Grid>
          ))
        : null}
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  spellsData: state.spells,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSpells: () => dispatch(fetchSpells()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpellsGrid);
