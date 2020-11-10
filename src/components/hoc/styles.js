import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    MainContainer: {
        display: "flex",
        justifyContent: "center",
        margin: theme.spacing(4, 0)
    },
    AltContainer: {
        width: "90vw"
    }
}))