import { createTheme } from '@mui/material/styles';
import { teal } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: '#dc8e8e',
    },
  },
});

theme.typography.h2 = {
  fontSize: "3rem",
  "@media (min-width:600px)": {
    fontSize: "5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "5rem",
  },
};

export default theme;