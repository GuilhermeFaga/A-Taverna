import { makeStyles } from "@material-ui/core/styles";
import { Icon, IconButton, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { filterSpells } from "redux/store";
import { AppDispatch, RootState } from "redux/store";

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  textFieldRoot: {
    color: theme.palette.text.secondary,
    width: "100%",
    marginLeft: theme.spacing(1),
    "& > input": {
      borderBottom: "none",
    },
  },
  textField: {
    color: theme.palette.contrastText,
    "&before": {
      border: "1px solid rgba(255, 255, 255, 0.42)",
    },
  },
  fix: {
    height: 90,
  },
  disabled: {
    color: theme.palette.text.disabled,
  },
}));

export default function SpellsSearch() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const query = useSelector((state: RootState) => state.spells_filter.query);

  const handleInputChange = (dispatch: AppDispatch, clear = false) => (
    event: any
  ) => {
    if (clear) filterSpells("")(dispatch);
    else filterSpells(event.target.value)(dispatch);
  };

  return (
    <div className={classes.searchContainer}>
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
        <Icon className={!!query ? "" : classes.disabled}>close</Icon>
      </IconButton>
    </div>
  );
}

export function SpellsSearchFix() {
  return <div className={useStyles().fix}></div>;
}
