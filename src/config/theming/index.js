import { unstable_createMuiStrictModeTheme, responsiveFontSizes } from '@material-ui/core/styles';
import merge from 'lodash-es/merge'

import darkTheme from './dark/index'
import lightTheme from './light/index'

const general = {
    typography: {
        fontFamily: `'Epilogue', sans-serif`,
        h1: {

            fontWeight: "bold",
            fontSize: "4.75rem",
            lineHeight: 1.2
        },
        h2: {
            fontWeight: "bold",
            fontSize: "3rem",
            lineHeight: 1.2
        },
        h3: {
            fontWeight: "bold",
            fontSize: "2.5rem",
            lineHeight: 1.2
        },
        h4: {
            fontWeight: "bold",
            fontSize: "1.75rem"
        },
        h5: {
            fontWeight: "bold",
            fontSize: "1.25rem"
        },
        h6: {
            fontWeight: "bold",
            fontSize: ".875rem"
        },
        body1: {
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.875rem"
        },
        body2: {
            fontFamily: "'Montserrat', sans-serif",
            fontSize: ".75rem",
            fontWeight: "bold",
            letterSpacing: "0.0075em",
            lineHeight: 1.6
        },
        subtitle1: {
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.875rem",
            lineHeight: 1.25
        },
        subtitle2: {
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.75rem"
        }
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                ul: {
                    display: "block",
                    listStyleType: "disc",
                    marginBlockStart: 0,
                    marginBlockEnd: 0,
                    marginInlineStart: 0,
                    marginInlineEnd: 0,
                    paddingInlineStart: 0
                },
                a: {
                    textDecoration: "none",
                    color: "inherit"
                },
                p: {
                    "margin-block-start": 0,
                    "margin-block-end": 0
                }
            },
        },
        MuiOutlinedInput: {
            input: {
                '&:-webkit-autofill': {
                    transition: "background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s",
                    transitionDelay: "background-color 5000s, color 5000s"
                },
            },
        }
    },
}

export default function getTheme(type) {
    switch (type) {
        case "dark": {
            const theme = merge(general, darkTheme)
            return responsiveFontSizes(unstable_createMuiStrictModeTheme(theme))
        }
        case "light": {
            const theme = merge(general, lightTheme)
            return responsiveFontSizes(unstable_createMuiStrictModeTheme(theme))
        }
        default:
            return false
    }
}