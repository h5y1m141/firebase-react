import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3c3c93',
    },
    secondary: {
      main: '#787878',
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
