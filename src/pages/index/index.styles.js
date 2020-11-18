import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    MainContainer: {
        textAlign: "center"
    },
    MainTitle: {
        marginBottom: theme.spacing(4)
    },
    SearchBoxSection: {
        marginBottom: theme.spacing(4)
    },
    SelectedSchoolSection: {
        textAlign: "initial"
    },
    SelectedSchoolNotesSection: {
        marginTop: theme.spacing(4),
        boxShadow: theme.shadows[6]
    }
}))