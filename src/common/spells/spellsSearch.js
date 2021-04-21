import { makeStyles } from "@material-ui/core/styles";
import { Card, Icon, IconButton, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { filterSpells } from "../../app/actions";
import store from "../../app/store";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: 792,
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(4),
  },
  search: {
    display: "flex",
    alignItems: "center",
    width: 250,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 10,
    boxShadow: "0px 24px 128px 0px rgba(0,0,0,0.12)",
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  textFieldRoot: {
    color: theme.palette.text.secondary,
    width: "100%",
    marginLeft: theme.spacing(1),
  },
  textField: {
    color: theme.palette.text.secondary,
    "&before": {
      border: "1px solid rgba(255, 255, 255, 0.42)",
    },
  },
  fix: {
    height: 104,
    marginBottom: theme.spacing(4),
  },
  disabled: {
    color: theme.palette.text.gray,
  },
}));

export default function SpellsSearch() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const query = useSelector((state) => state.spells_filter.query);

  return (
    <div className={classes.searchContainer}>
      <Card className={classes.search}>
        <Icon color="secondary">search</Icon>
        <TextField
          color="secondary"
          classes={{ root: classes.textFieldRoot }}
          inputProps={{
            className: classes.textField,
          }}
          onChange={handleInputChange(dispatch)}
          placeholder="Pesquisar"
          value={query}
        />
        <IconButton
          color={"secondary"}
          onClick={handleInputChange(dispatch, true)}
        >
          <Icon className={!!query ? null : classes.disabled}>close</Icon>
        </IconButton>
      </Card>
    </div>
  );
}

export function SpellsSearchFix() {
  return <div className={useStyles().fix}></div>;
}

const handleInputChange = (dispatch, clear = false) => (event) => {
  if (clear) filterSpells("")(dispatch);
  else filterSpells(event.target.value)(dispatch);
};
