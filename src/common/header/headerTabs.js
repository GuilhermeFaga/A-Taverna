import React from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Tabs, Tab } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tabsContainer: {
    backgroundColor: theme.palette.secondary.main,
    zIndex: -2,
    borderRadius: 10,
    padding: theme.spacing(1),
    paddingRight: -theme.spacing(3),
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
  },
}));

const HeaderTabs = withStyles((theme) => ({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: "100%",
    "& > span": {
      backgroundColor: theme.palette.primary.main,
      borderRadius: 10,
      width: "100%",
      zIndex: -1,
    },
  },
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const HeaderTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: "auto",
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(15),
    "&:nth-child(-n+2)": {
      marginRight: theme.spacing(3),
    },
    "&:focus": {
      opacity: 1,
    },
    "&$selected": {
      color: theme.palette.secondary.main,
      animation: "$colorChange 0.5s",
    },
    "&:hover": {
      opacity: 1,
    },
  },
  selected: {},
  "@keyframes colorChange": {
    "0%": {
      color: theme.palette.primary.main,
    },
    "100%": {
      color: theme.palette.secondary.main,
    },
  },
}))((props) => <Tab disableRipple {...props} />);
export default function HeaderNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.tabsContainer}>
      <HeaderTabs value={value} onChange={handleChange}>
        <HeaderTab label="Classes" />
        <HeaderTab label="Home" />
        <HeaderTab label="Magias" />
      </HeaderTabs>
    </div>
  );
}