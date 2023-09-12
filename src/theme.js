import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#922c88",
      dark: "#73236b",
      100: "#e1bee7",
      200: "#ce93d8",
      300: "#ba68c8",
      400: "#ab47bc",
      500: "#9c27b0",
    },
    text: {
      secondary: "#878787",
    },
  },
  typography: {
    fontFamily: ['"Nunito"', "Open Sans"].join(","),
    caption: {
      fontSize: "0.8rem",
    },
    h6: {
      fontSize: "1.15rem",
    },
  },
});

export default theme;
