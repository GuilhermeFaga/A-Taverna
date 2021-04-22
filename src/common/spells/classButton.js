import { useSelector, useDispatch } from "react-redux";
import { ButtonBase, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "auto",
  },
  class: {
    textAlign: "center",
    height: "min-content",
  },
  btn: {
    width: "100%",
    borderRadius: 100,
  },
  classImg: {
    width: "100%",
    paddingTop: "100%",
    borderRadius: 100,
    backgroundColor: theme.palette.text.secondary,
  },
}));

export default function ClassButton({ classData }) {
  const classes = useStyles();
  const selected = useSelector((state) => state.class_spells.selected);

  return (
    <Grid key={Math.random()} item xs={3} className={classes.class}>
      <ButtonBase className={classes.btn}>
        <div className={classes.classImg}></div>
      </ButtonBase>
      <Typography variant="caption">{classData.class}</Typography>
    </Grid>
  );
}
