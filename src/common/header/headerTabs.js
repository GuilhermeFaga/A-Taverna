import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { changePath } from "../../app/actions";
import { useHistory } from "react-router-dom";
import { Tabs, Tab } from "@material-ui/core";

const CustomTabs = withStyles((theme) => ({
  indicator: {
    height: 4,
    borderRadius: 25,
  },
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const CustomTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: "auto",
    fontWeight: theme.typography.fontWeightMedium,
    paddingBottom: 4,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(3),
    transition: "opacity 0.5s",
    "&$selected": {
      color: theme.palette.secondary.main,
    },
    "&:hover": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

export default function HeaderTabs() {
  const dispatch = useDispatch();
  let history = useHistory();
  const value = useSelector((state) => state.page.path);

  const handleChange = (event, newValue) => {
    dispatch(changePath(newValue));
    history.push(newValue);
  };

  return (
    <CustomTabs value={value} onChange={handleChange}>
      <CustomTab label="Home" value="/" />
      <CustomTab label="Magias" value="/magias" />
      <CustomTab label="Classes" value="/classes" />
    </CustomTabs>
  );
}
