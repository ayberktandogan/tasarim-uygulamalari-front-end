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
        gap: "16px",
        "& .active": {
            color: theme.palette.getContrastText(theme.palette.primary.main),
            backgroundColor: theme.palette.primary.main,
            borderRadius: theme.spacing(1),
            boxShadow: theme.shadows[6]
        },
    },
    HeaderButtonList: {
        marginLeft: theme.spacing(2)
    },
    HeaderButtonItem: {
        display: "flex",
        padding: theme.spacing(1),
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
    },
    AvatarSmall: {
        width: 32,
        height: 32
    }
}))

