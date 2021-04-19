import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Tabs, Tab } from "@material-ui/core";
import HeaderNav from "../common/header/headerTabs";

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
  tabsContainer: {
    backgroundColor: theme.palette.secondary.main,
    zIndex: -2,
    borderRadius: 10,
    padding: theme.spacing(1),
    paddingRight: -theme.spacing(3),
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <Grid item className={classes.headerContainer} xs={12}>
      <div className={classes.header}>
        <div></div>
        <HeaderNav />
        <div></div>
      </div>
    </Grid>
  );
}
