import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchSpells } from "../../app/actions";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress, ListItem, ListItemText } from "@material-ui/core";
import { AutoSizer } from "react-virtualized";
import { spellSelected } from "../../app/actions";
import { FixedSizeList as List } from "react-window";

const useStyles = makeStyles((theme) => ({
  list: {
    ...theme.scrollbarStyle,
    borderLeft: "1px solid",
    borderRight: "1px solid",
    borderLeftColor: theme.palette.divider,
    borderRightColor: theme.palette.divider,
    textTransform: "lowercase",
    backgroundColor: theme.palette.background.paper,
    "& span:first-line": {
      fontWeight: 500,
      textTransform: "capitalize",
    },
  },
  loading: {
    height: "100%",
    borderLeft: "1px solid",
    borderRight: "1px solid",
    borderLeftColor: theme.palette.divider,
    borderRightColor: theme.palette.divider,
  },
}));

function SpellsList({ spellsData, fetchSpells }) {
  const classes = useStyles();
  const filtered = useSelector((state) => state.spells_filter);
  const loading = useSelector((state) => state.spells.loading);

  const spells = filtered.data.length ? filtered.data : spellsData.data;

  useEffect(() => {
    fetchSpells();
  }, [fetchSpells]);

  if (loading)
    return (
      <div className={classes.loading}>
        <LinearProgress />
      </div>
    );

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
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </React.Fragment>
  );
}

function Row({ data: spells, index, style }) {
  const dispatch = useDispatch();
  const selectedId = useSelector((state) => state.spells.selectedId);
  const selected =
    spells && spells[index] ? spells[index].id === selectedId : null;
  if (!spells) return null;

  return (
    <ListItem
      style={style}
      button
      onClick={() => dispatch(spellSelected(spells[index]))}
      selected={selected}
    >
      <ListItemText
        primary={spells[index].name}
        secondary={spells[index].type}
      />
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
