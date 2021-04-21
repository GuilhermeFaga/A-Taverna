import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import GithubIcon from "../../assets/githubIcon";
import { github } from "../../app/endpoints";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    height: "fit-content",
  },
}));

export default function GithubButton() {
  const classes = useStyles();

  return (
    <IconButton className={classes.iconButton} href={github} target="_blank">
      <GithubIcon />
    </IconButton>
  );
}
