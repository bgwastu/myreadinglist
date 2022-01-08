import { createTheme } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
      light: grey[200],
    },
    secondary: {
      main: blueGrey[900],
      light: blueGrey[200],
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: grey[100],
          color: '#0A090A',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export default theme;
