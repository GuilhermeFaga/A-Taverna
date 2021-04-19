import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import HeaderNav from "../common/header/headerTabs";
import GithubButton from "../common/header/githubButton";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: "flex",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    width: "100%",
    zIndex: 99,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    justifyContent: "space-between",
    maxWidth: 1200,
  },
  rightSide: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
  leftSide: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <Grid item className={classes.headerContainer} xs={12}>
      <div className={classes.header}>
        <div className={classes.rightSide}></div>
        <HeaderNav />
        <div className={classes.leftSide}>
          <GithubButton />
        </div>
      </div>
    </Grid>
  );
}
