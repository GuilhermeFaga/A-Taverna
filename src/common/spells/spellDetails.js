import { Grid, Typography } from "@material-ui/core";
import SpellComponent from "./spellComponent";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { useAnimation, motion } from "framer-motion";

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
  textSecondary: {
    color: theme.palette.text.secondary,
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

const container = {
  enter: {
    opacity: 0.2,
    transition: {
      duration: 0,
    },
  },
  settle: {
    x: 0,
    opacity: 1,
  },
};

async function sequence(controls) {
  await controls.start("enter");
  return await controls.start("settle");
}

export default function SpellDetails() {
  const spells = useSelector((state) => state.spells.data);
  const selectedId = useSelector((state) => state.spells.selectedId);
  const classes = useStyles();
  const controls = useAnimation();

  if (!selectedId || !spells) return null;

  const spell = spells.filter((s) => s.id === selectedId)[0];

  if (!spell) return null;

  sequence(controls);

  return (
    <motion.div
      className={classes.container}
      variants={container}
      animate={controls}
    >
      <Grid container className={classes.topContainer} spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.lineHeight}>
            {spell.name}
          </Typography>
          <Typography
            style={{
              fontStyle: "italic",
            }}
            className={classes.textSecondary}
            variant="caption"
          >
            {spell.type}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="overline"
            className={classes.lineHeight + " " + classes.textSecondary}
          >
            TEMPO DE CONJURAÇÃO
          </Typography>
          <Typography variant="body1" className={classes.lineHeight}>
            {spell.casting_time}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="overline"
            className={classes.lineHeight + " " + classes.textSecondary}
          >
            ALCANCE
          </Typography>
          <Typography variant="body1" className={classes.lineHeight}>
            {spell.range}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="overline"
            className={classes.lineHeight + " " + classes.textSecondary}
          >
            DURAÇÃO
          </Typography>
          <Typography variant="body1" className={classes.lineHeight}>
            {spell.duration}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="overline"
            className={classes.lineHeight + " " + classes.textSecondary}
          >
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
            <Typography
              variant="overline"
              className={classes.lineHeight + " " + classes.textSecondary}
            >
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
    </motion.div>
  );
}
