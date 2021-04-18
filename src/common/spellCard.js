import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 250,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 10,
    boxShadow: "0px 24px 128px 0px rgba(0,0,0,0.12)",
  },
  titleArea: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
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
  components: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1),
    textAlign: "center",
    borderRadius: 100,
    height: 24,
    width: 24,
  },
}));

export default function SpellCard({ spell }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
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
            <div className={classes.components}>
              <Typography variant="body1">{component}</Typography>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function formatCastingTime(ct) {
  const match = ct.match(/(\d+) ([^,\s]{1,9})/);
  const value = match[1];
  const unit = formatCTUnit(match[2]);
  return value + unit;
}

function formatCTUnit(unit) {
  if (unit.startsWith("minuto")) return "'";
  if (unit.startsWith("hora")) return "h";
  if (unit === "ação") return " a";
  if (unit === "ação bônus") return " ab";
  if (unit === "reação") return " r";
  return unit;
}

function formatRange(r) {
  if (r.includes("metro") || r.includes("quilômetro")) {
    const match = r.match(/([\d,]+) ([^,\s]{1,15})/);
    const value = match[1];
    const unit = formatRUnit(match[2]);
    return value + unit;
  }
  if (r.startsWith("Pessoal")) return " P";
  if (r.startsWith("Toque")) return "0";
  return r;
}

function formatRUnit(unit) {
  if (unit.startsWith("metro")) return "m";
  if (unit.startsWith("quilômetro")) return "km";
  if (unit === "Toque") return "";
  if (unit === "ação bônus") return " ab";
  if (unit === "reação") return " r";
  return unit;
}

function formatDuration(d) {
  if (d === "Instantânea") return "I";
  if (d === "Até ser dissipada") return "D";
  if (d === "Especial") return "E";
  if (d.startsWith("Concentração")) return "C";
  const match = d.match(/(\d+) ([^,\s]{1,9})/);
  const value = match[1];
  const unit = formatDUnit(match[2]);
  return value + unit;
}

function formatDUnit(unit) {
  if (unit.startsWith("minuto")) return "'";
  if (unit.startsWith("hora")) return "h";
  if (unit.startsWith("dia")) return " d";
  if (unit.startsWith("rodada")) return " r";
  return unit;
}
