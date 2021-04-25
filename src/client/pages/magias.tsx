import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { appBarHeight } from "components/header";
import SpellsList from "components/spellsList";
import CustomHead from "components/customHead";
import { Spell } from "util/types";
import { capitalize } from "util/helper";
import SpellDetails from "components/spellDetails";
import { useDispatch, useSelector } from "react-redux";
import { spellSelected, spellsLoaded } from "redux/reducer";
import useSWR from "swr";

const useStyles = makeStyles((theme) => ({
  spellsList: {
    height: `calc(100vh - ${appBarHeight}px)`,
    paddingBottom: "0 !important",
  },
  test2: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  test: {
    width: "-webkit-fill-available",
    height: "100%",
    position: "absolute",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export default function Spells() {
  const classes = useStyles();

  return (
    <>
      <SpellHead />
      <Grid item xs={2}></Grid>
      <Grid item className={classes.spellsList} xs={2}>
        <SpellsList />
      </Grid>
      <Grid item xs={7}>
        <SpellDetails />
      </Grid>
      <Grid item xs={1}>
        <div className={classes.test2}>
          <Paper elevation={3} className={classes.test} square></Paper>
        </div>
      </Grid>
    </>
  );
}

function SpellHead() {
  const { spellsData, isLoading } = useSpells();
  const dispatch = useDispatch();
  const router = useRouter();

  var title = "Magias";

  if (!isLoading) {
    var selectedSpell = spellsData[0];

    var id = router.asPath.split("/")
      ? router.asPath.split("/")[2]
      : "acalmar-emocoes";

    spellsData.forEach((spell) => {
      if (spell.id === id) selectedSpell = spell;
    });

    dispatch(spellSelected(selectedSpell));

    title += ` - ${capitalize(selectedSpell.name)}`;
  }

  return <CustomHead title={title} />;
}

export function useSpells() {
  const { data, error } = useSWR("/api/spells/", fetcher);
  const dispatch = useDispatch();
  dispatch(spellsLoaded(data));

  const spells: Array<Spell> = data;

  return {
    spellsData: spells,
    isLoading: !error && !data,
    isError: error,
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
