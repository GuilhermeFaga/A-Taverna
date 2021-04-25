// import { useDispatch, useSelector } from "react-redux";
import { Tabs, Tab, TabProps } from "@material-ui/core";
import { useRouter } from "next/router";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";

const CustomTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: "auto",
    fontWeight: theme.typography.fontWeightMedium,
    paddingBottom: 4,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(3),
    transition: "opacity 0.5s",
    "&:hover": {
      opacity: 1,
    },
  },
}))((props: TabProps) => <Tab disableRipple {...props} />);

export default function HeaderTabs() {
  const router = useRouter();

  const handleChange = (event: object, value: any) => router.push(value);

  return (
    <Tabs value={router.pathname} onChange={handleChange}>
      <CustomTab label="Home" value="/" />
      <CustomTab label="Magias" value="/magias" />
      <CustomTab label="Classes" value="/classes" />
    </Tabs>
  );
}
