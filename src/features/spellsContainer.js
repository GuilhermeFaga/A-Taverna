import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSpells } from "../app/actions";

function SpellsContainer({ spellsData, fetchSpells }) {
  useEffect(() => {
    fetchSpells();
  }, [fetchSpells]);

  console.log(spellsData);
  return <div>Spells</div>;
}

const mapStateToProps = (state) => ({
  spellsData: state.spells,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSpells: () => dispatch(fetchSpells()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpellsContainer);
