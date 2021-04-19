import { makeStyles } from "@material-ui/core/styles";
import { Card, Icon, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { filterSpells } from "../../app/actions";

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
    padding: theme.spacing(1.5),
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
}));

export default function SpellsSearch() {
  const classes = useStyles();

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
          onChange={handleInputChange(useDispatch())}
          placeholder="Pesquisar"
        />
      </Card>
    </div>
  );
}

export function SpellsSearchFix() {
  return <div className={useStyles().fix}></div>;
}

const handleInputChange = (dispatch) => (event) => {
  filterSpells(event.target.value)(dispatch);
};
