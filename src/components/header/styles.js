import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
    HeaderContainer: {
        padding: theme.spacing(1, 0),
        boxShadow: theme.shadows[0],
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.up(920)]: {
            padding: theme.spacing(1, 4),
        }
    },
    Logo: {
        marginRight: "auto",
        "& img": {
            height: 52
        }
    },
    HeaderLinkList: {
        display: "inline-flex",
        gap: "16px"
    },
    HeaderButtonList: {
        marginLeft: theme.spacing(2)
    },
    HeaderButtonItem: {
        display: "flex",
        "& svg": {
            marginRight: theme.spacing(0.5)
        }
    },
    DesktopButtons: {
        display: "none",
        [theme.breakpoints.up(920)]: {
            display: "flex",
            alignItems: "center"
        }
    },
    MobileButton: {
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.up(920)]: {
            display: "none"
        }
    },
    MobileDrawer: {
        width: "100vw",
        "& svg": {
            fontSize: "24px"
        }
    },
    MobileDrawerBackButton: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    }
}))

