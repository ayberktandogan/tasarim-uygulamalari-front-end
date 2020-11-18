import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    MainContainer: {
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[6]
    },
    InformationContainer: {

    },
    ErrorContainer: {
        marginTop: theme.spacing(4)
    }
}))