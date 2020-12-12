import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    SchoolListContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
        gridGap: theme.spacing(2)
    },
    SchoolItem: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper
    }
}))