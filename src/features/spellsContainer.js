import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchSpells, switchTheme } from "../app/actions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.teste,
  },
}));

function SpellsContainer({ spellsData, fetchSpells }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    fetchSpells();
  }, [fetchSpells]);

  console.log(spellsData);
  return (
    <div>
      <button
        className={classes.button}
        onClick={() => dispatch(switchTheme())}
      >
        Trocar temas
      </button>
      {spellsData.data
        ? spellsData.data.map((spell) => <p key={spell.name}>{spell.name}</p>)
        : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  spellsData: state.spells,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSpells: () => dispatch(fetchSpells()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpellsContainer);
