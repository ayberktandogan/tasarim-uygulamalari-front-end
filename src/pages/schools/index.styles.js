import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    SchoolListContainer: {
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)",
        gridGap: theme.spacing(2)
    },
    SchoolItem: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper
    },
    SchoolItemCoverart: {
        width: theme.spacing(8),
        marginRight: theme.spacing(1)
    },
    ButtonContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(2)
    }
}))