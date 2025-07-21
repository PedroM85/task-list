import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // 💥 Desactiva el ripple globalmente
      },
    },
  },
});

export default theme;
