import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core";
import { AutoSizer } from "react-virtualized";
import { FixedSizeList as List } from "react-window";
import { Spell } from "util/types";
import { useRouter } from "next/router";
import { useSpells } from "pages/magias";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { spellSelected } from "redux/reducer";

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

export default function SpellsList() {
  const { spellsData, isLoading } = useSpells();
  const filtered = useSelector((state: RootState) => state.spells_filter.data);
  const classes = useStyles();

  if (isLoading) return <h2>Loading...</h2>;

  const spells = filtered.length ? filtered : spellsData;

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

function Row({
  data: spells,
  index,
  style,
}: {
  data: Array<Spell>;
  index: number;
  style: any;
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  var id = router.asPath.split("/")
    ? router.asPath.split("/")[2]
    : "acalmar-emocoes";

  const selected = id == spells[index].id;

  return (
    <ListItem
      style={style}
      button
      onClick={() => {
        if (!(router.query.id && router.query.id[0] === spells[index].id)) {
          router.push("/magias/" + spells[index].id, undefined, {
            shallow: true,
          });
          dispatch(spellSelected(spells[index]));
        }
      }}
      selected={selected}
    >
      <ListItemText
        primary={spells[index].name}
        secondary={spells[index].type}
      />
    </ListItem>
  );
}
