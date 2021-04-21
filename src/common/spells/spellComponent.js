import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  components: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.contrastText,
    marginRight: theme.spacing(1),
    textAlign: "center",
    borderRadius: 100,
    height: 24,
    width: 24,
  },
}));

export default function SpellComponent({ component }) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.components}>
        <Typography variant="body1">{component}</Typography>
      </div>
    </div>
  );
}
