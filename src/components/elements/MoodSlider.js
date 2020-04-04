import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const styles = {
  root: {
    color: "cornflowerblue",
    height: 7
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#d7d7d7",
    border: "2px solid #d7d7d7",
    marginTop: -7,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 6,
    borderRadius: 4
  },
  rail: {
    height: 6,
    borderRadius: 4
  }
};

export default withStyles(styles)(Slider);
