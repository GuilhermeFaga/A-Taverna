import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useAnimation, motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  components: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.contrastText,
    marginRight: theme.spacing(1),
    textAlign: "center",
    borderRadius: 100,
    height: 24,
    width: 24,
  },
}));

async function sequence(controls: any) {
  await controls.start("enter");
  return await controls.start("settle");
}

export default function SpellComponent({ component }: { component: string }) {
  const classes = useStyles();
  const controls = useAnimation();
  const delay = ["V", "S", "M", "F", "FD", "XD"].indexOf(component);

  const container = {
    enter: {
      scale: 0,
      transition: {
        duration: 0,
      },
    },
    settle: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: delay * 0.05,
        duration: 0.1,
      },
    },
  };

  sequence(controls);

  return (
    <motion.div
      className={classes.components}
      variants={container}
      animate={controls}
    >
      <Typography variant="body1">{component}</Typography>
    </motion.div>
  );
}
