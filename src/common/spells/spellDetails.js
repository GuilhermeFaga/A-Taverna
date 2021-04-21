import { Grid, Typography } from "@material-ui/core";
import SpellComponent from "./spellComponent";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { SpellsSearchFix } from "./spellsSearch";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(3),
    position: "fixed",
    maxWidth: "inherit",
    height: "-webkit-fill-available",
    maxHeight: "inherit",
    display: "flex",
    flexDirection: "column",
  },
  topContainer: {
    height: "min-content",
  },
  lineHeight: {
    lineHeight: "1.2",
  },
  componentsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  description: {
    marginTop: theme.spacing(2),
    marginBottom: 64,
    overflowY: "auto",
    overscrollBehavior: "contain",
  },
}));

export default function SpellDetails() {
  const spells = useSelector((state) => state.spells.data);
  const selectedId = useSelector((state) => state.spells.selectedId);
  const classes = useStyles();

  if (!selectedId || !spells) return null;

  const spell = spells.filter((s) => s.id === selectedId)[0];

  if (!spell) return null;

  return (
    <div className={classes.container}>
      <Grid container className={classes.topContainer} spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.lineHeight}>
            {spell.name}
          </Typography>
          <Typography
            style={{
              fontStyle: "italic",
            }}
            variant="caption"
          >
            {spell.type}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="overline" className={classes.lineHeight}>
            TEMPO DE CONJURAÇÃO
          </Typography>
          <Typography variant="body1" className={classes.lineHeight}>
            {spell.casting_time}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="overline" className={classes.lineHeight}>
            ALCANCE
          </Typography>
          <Typography variant="body1" className={classes.lineHeight}>
            {spell.range}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="overline" className={classes.lineHeight}>
            DURAÇÃO
          </Typography>
          <Typography variant="body1" className={classes.lineHeight}>
            {spell.duration}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="overline" className={classes.lineHeight}>
            COMPONENTES
          </Typography>
          <div className={classes.componentsContainer}>
            {spell.components.map((component) => (
              <SpellComponent component={component} />
            ))}
          </div>
        </Grid>
        {spell.materiais ? (
          <Grid item xs={3}>
            <Typography variant="overline" className={classes.lineHeight}>
              MATERIAIS
            </Typography>
            <Typography>{spell.materials}</Typography>
          </Grid>
        ) : null}
      </Grid>
      <Grid item xs={12} className={classes.description}>
        <Typography variant="body1">
          <ReactMarkdown remarkPlugins={[gfm]}>
            {spell.description}
          </ReactMarkdown>
        </Typography>
      </Grid>
    </div>
  );
}
