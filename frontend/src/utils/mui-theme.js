import { createTheme } from '@mui/material/styles';
import { palette } from './color';

const initialTheme = createTheme({
    palette: {
      primary: {
        main: palette.primary.main
      },
      secondary: {
        main: palette.secondary.main
      },
    },
    // typography: {
    //   h1: {
    //     color: colorPrimary,
    //     fontSize: '3rem',
    //     fontWeight: 400
    //   },
    //   h2: {
    //     color: colorSecondary,
    //     fontSize: '2rem',
    //     fontWeight: 400
    //   },
    //   h3: {
    //     color: colorSecondary,
    //     fontSize: '1.4rem',
    //     fontWeight: 400
    //   }
    // }
  });

export const theme = createTheme({
    ...initialTheme,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            textTransform: 'none',
            background: palette.secondary.main,
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: 20,
            outline: 'none',
            '&:hover': {
              boxShadow: 'none',
              background: palette.primary.main
            }
          }
        }
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            position: 'absolute',
            top: '-25px',
            right: '-10px',
            textTransform: 'uppercase',
            fontWeight: 'bold'
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            background: '#fff',
            padding: '0px',
            '> fieldset': {
              borderWidth: '2px'
            },
            '&.MuiInputBase-root:hover fieldset': {
              borderColor: palette.primary.main
              }
          },
        }
      },
      MuiInputLabel: {
        styleOverrides:{
          root:{
            fontWeight: 'bold',
            color: 'inherit'
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            padding: 0,
            '&.Mui-focused': {
              '&.MuiInputBase-root fieldset': {
              // borderColor: palette.secondary.main
              }
            },
          },
          input: {
            padding: '10px 15px',
          },
          notchedOutline: {
            borderColor: palette.border.dark,
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          rounded: {
            borderRadius: '20px',
            padding: '10px'
          }
        }
      }
    }
  });
