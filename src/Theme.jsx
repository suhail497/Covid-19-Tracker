import { createMuiTheme } from '@material-ui/core/styles';

const arcBlue = "#3360ff";
const arcOrange = "#FFBA60";

export default createMuiTheme({
  palette: {
    common: {
      Blue: `${arcBlue}`,
      Orange: `${arcOrange}`,
    },
    primary: {
      main: `${arcBlue}`,
    },
    secondary: {
      main: `${arcOrange}`,
    },
  },
})