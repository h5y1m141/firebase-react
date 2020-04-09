import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F5F5F5',
    },
    secondary: {
      main: '#C4C4C4',
    },
  },
  typography: {
    button: {
      fontWeight: 'bold',
      textTransform: 'inherit',
    },
  },
  overrides: {
    MuiInputBase: {
      root: {
        fontSize: '0.875rem',
      },
    },
  },
})

export default responsiveFontSizes(theme)
