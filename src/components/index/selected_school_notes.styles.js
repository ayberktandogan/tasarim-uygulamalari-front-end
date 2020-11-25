import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    NotesContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
        gridGap: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        },
        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        },
        [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        },
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[6]
    },
    NoteContainer: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(2),
        boxShadow: theme.shadows[2]
    },
    PdfIcon: {
        marginBottom: theme.spacing(2)
    }
}))