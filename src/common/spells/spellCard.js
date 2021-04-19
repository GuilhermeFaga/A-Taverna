import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, ButtonBase } from "@material-ui/core";
import { spellSelected } from "../../app/actions";
import SpellComponent from "./spellComponent";
import { formatCastingTime, formatRange, formatDuration } from "../helper";

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 10,
  },
  true: {
    "&:after": {
      content: "''",
      border: "1px solid",
      borderColor: theme.palette.primary.main,
      animation: "$fadeIn 0.5s",
      borderRadius: 13,
      height: "107%",
      width: "103%",
      position: "absolute",
      transition: "opacity 1s",
    },
  },
  false: {
    "&:after": {
      content: "''",
      border: "1px solid",
      borderColor: theme.palette.primary.main,
      borderRadius: 13,
      transition: "opacity 0.2s",
      height: "107%",
      width: "103%",
      position: "absolute",
      opacity: 0,
    },
  },
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
  card: {
    width: 250,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 10,
    boxShadow: "none",
    filter: "drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.04))",
    textAlign: "start",
    overflow: "visible",
    "&:before": {
      content: "''",
      border: "1px solid",
      borderRadius: 10,
      width: "99.5%",
      height: "98%",
      position: "absolute",
    },
  },
  titleArea: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    borderRadius: "10px 10px 0px 0px",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  type: {
    color: theme.palette.text.gray,
  },
  bottomArea: {
    color: theme.palette.text.primary,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
  },
  bottomItem: {
    marginRight: theme.spacing(2),
    whiteSpace: "nowrap",
  },
  value: {
    fontWeight: 500,
  },
  componentsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
}));

export default function SpellCard({ spell }) {
  const dispatch = useDispatch();
  const selected =
    spell.spell_id === useSelector((state) => state.spells.selectedId);
  const classes = useStyles();

  return (
    <ButtonBase
      disableRipple
      className={classes.button + " " + classes[selected]}
      onClick={() => dispatch(spellSelected(spell))}
    >
      <Card className={classes.card}>
        <div className={classes.titleArea}>
          <Typography variant="subtitle2">{spell.name}</Typography>
          <Typography className={classes.type} variant="caption">
            {spell.type}
          </Typography>
        </div>
        <div className={classes.bottomArea}>
          <div className={classes.bottomItem}>
            <Typography variant="overline">TC</Typography>
            <Typography variant="body1" className={classes.value}>
              {formatCastingTime(spell.casting_time)}
            </Typography>
          </div>
          <div className={classes.bottomItem}>
            <Typography variant="overline">ALC</Typography>
            <Typography variant="body1" className={classes.value}>
              {formatRange(spell.range)}
            </Typography>
          </div>
          <div className={classes.bottomItem}>
            <Typography variant="overline">DUR</Typography>
            <Typography variant="body1" className={classes.value}>
              {formatDuration(spell.duration)}
            </Typography>
          </div>
          <div className={classes.componentsContainer}>
            {spell.components.map((component) => (
              <SpellComponent
                key={"card" + spell.name + component}
                component={component}
              />
            ))}
          </div>
        </div>
      </Card>
    </ButtonBase>
  );
}
