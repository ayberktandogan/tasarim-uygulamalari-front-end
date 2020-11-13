import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    MainContainer: {
        marginTop: theme.spacing(8)
    },
    AltContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
    },
    FourOhFourGif: {
        width: "100%",
        marginBottom: theme.spacing(4),
        boxShadow: theme.shadows[6],
        [theme.breakpoints.up('sm')]: {
            width: 450
        }
    },
    TextContainer: {
        marginBottom: theme.spacing(2)
    }
}))