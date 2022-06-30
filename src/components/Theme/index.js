import { createMuiTheme } from "@material-ui/core/styles";
// import gray from '@material-ui/core/colors/gray';
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fafafa",
    },
    secondary: blue,
  },
});

export default theme;
