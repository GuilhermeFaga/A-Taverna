import { Grid, Typography } from "@material-ui/core";
import SpellComponent from "./spellComponent";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { useAnimation, motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    backgroundColor: theme.palette.background.default,
  },
  motion: {
    height: `calc(100% - ${theme.spacing(3)}px)`,
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
  topContainer: {
    height: "min-content",
    paddingRight: theme.spacing(3),
  },
  lineHeight: {
    lineHeight: "1.2",
    "&:first-letter": {
      textTransform: "uppercase",
    },
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
    ...theme.scrollbarStyle,
    paddingRight: theme.spacing(3),
    position: "relative",
    height: "100%",
    marginTop: theme.spacing(2),
    overflowY: "auto",
    overscrollBehavior: "contain",
  },
  descriptionText: {
    position: "absolute",
    paddingRight: theme.spacing(3),
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
    <div className={classes.container}>
      <motion.div
        className={classes.motion}
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
                <SpellComponent key={component} component={component} />
              ))}
            </div>
          </Grid>
          {spell.materials ? (
            <Grid item xs={12}>
              <Typography
                variant="overline"
                className={classes.lineHeight + " " + classes.textSecondary}
              >
                MATERIAIS
              </Typography>
              <Typography className={classes.lineHeight}>
                {spell.materials}
              </Typography>
            </Grid>
          ) : null}
        </Grid>
        <Grid item xs={12} className={classes.description}>
          <Typography
            variant="body1"
            component="div"
            className={classes.descriptionText}
          >
            <ReactMarkdown remarkPlugins={[gfm]}>
              {spell.description}
            </ReactMarkdown>
          </Typography>
        </Grid>
      </motion.div>
    </div>
  );
}
