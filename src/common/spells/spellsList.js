import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchSpells } from "../../app/actions";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core";
import { AutoSizer } from "react-virtualized";
import { spellSelected } from "../../app/actions";
import { FixedSizeList as List } from "react-window";
import { useAnimation, motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  list: {
    ...theme.scrollbarStyle,
    borderLeft: "1px solid",
    borderRight: "1px solid",
    borderLeftColor: "#f2f2f2",
    borderRightColor: "#f2f2f2",
    textTransform: "lowercase",
    "& span:first-line": {
      fontWeight: 500,
      textTransform: "capitalize",
    },
  },
}));

function SpellsList({ spellsData, fetchSpells }) {
  const classes = useStyles();
  const filtered = useSelector((state) => state.spells_filter);

  const spells = filtered.data.length ? filtered.data : spellsData.data;

  useEffect(() => {
    fetchSpells();
  }, [fetchSpells]);

  return (
    <React.Fragment>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            width={width}
            itemCount={spells.length}
            itemSize={64}
            itemData={spells}
            className={classes.list}
            key="spellsList"
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </React.Fragment>
  );
}

function Row({ data, index, style }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selected =
    data[index].id === useSelector((state) => state.spells.selectedId);

  return (
    <ListItem
      style={style}
      button
      onClick={() => dispatch(spellSelected(data[index]))}
      selected={selected}
    >
      <ListItemText primary={data[index].name} secondary={data[index].type} />
    </ListItem>
  );
}

const mapStateToProps = (state) => ({
  spellsData: state.spells,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSpells: () => dispatch(fetchSpells()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpellsList);
