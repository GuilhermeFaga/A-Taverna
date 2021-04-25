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
import { RootState } from "redux/store";
import { useEffect } from "react";
import { spellsLoaded } from "redux/reducer";

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

export default function Spells({
  spells: spellsData,
}: {
  spells: Array<Spell>;
}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const filtered = useSelector((state: RootState) => state.spells_filter);

  useEffect(() => {
    dispatch(spellsLoaded(spellsData));
  }, []);

  const spells = filtered.data.length ? filtered.data : spellsData;

  var id = router.query.id ? router.query.id[0] : "acalmar-emocoes";

  var selectedSpell = spells[0];

  spells.forEach((spell) => {
    if (spell.id === id) selectedSpell = spell;
  });

  return (
    <>
      <CustomHead title={`Magias - ${capitalize(selectedSpell.name)}`} />
      <Grid item xs={2}></Grid>
      <Grid item className={classes.spellsList} xs={2}>
        <SpellsList spells={spells} />
      </Grid>
      <Grid item xs={7}>
        <SpellDetails spell={selectedSpell} />
      </Grid>
      <Grid item xs={1}>
        <div className={classes.test2}>
          <Paper elevation={3} className={classes.test} square></Paper>
        </div>
      </Grid>
    </>
  );
}

export async function getStaticProps() {
  const req = await fetch("https://a-taverna.web.app/api/spells");
  const data = await req.json();

  return {
    props: {
      spells: data,
    },
    revalidate: 86400,
  };
}
