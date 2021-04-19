import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchSpells, spellsScrollBottom } from "../../app/actions";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import SpellCard from "./spellCard";
import { trackScrolling } from "../helper";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: 792,
  },
}));

function SpellsGrid({ spellsData, fetchSpells }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const filtered = useSelector((state) => state.spells_filter);

  const spells = filtered.data.length
    ? filtered.data.slice(0, filtered.currentPageSize)
    : spellsData.data.slice(0, filtered.currentPageSize);

  console.log("render");

  useEffect(() => {
    fetchSpells();
    document.addEventListener(
      "scroll",
      trackScrolling(dispatch, spellsScrollBottom(), "spells_grid")
    );
  }, [fetchSpells]);

  return (
    <Grid container className={classes.grid} spacing={2} id="spells_grid">
      {spells
        ? spells.map((spell) => (
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
