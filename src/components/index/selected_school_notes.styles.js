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
        boxShadow: theme.shadows[2],
        height: "100%",
        position: "relative"
    },
    PdfIcon: {
        marginBottom: theme.spacing(2)
    },
    AddNoteContainer: {
        cursor: "pointer"
    },
    ModalContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    PaperContainer: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: 800,
        maxWidth: 800,
        [theme.breakpoints.down('sm')]: {
            minWidth: "100%",
            maxWidth: "100%"
        }
    },
    DeleteNotePaperContainer: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: 500,
        maxWidth: 500,
        [theme.breakpoints.down('sm')]: {
            minWidth: "100%",
            maxWidth: "100%"
        }
    },
    AlertContainer: {
        marginBottom: theme.spacing(2),
        boxShadow: theme.shadows[6]
    },
    AdminContainer: {
        position: "absolute",
        top: theme.spacing(1),
        right: theme.spacing(1),
        zIndex: 4
    }
}))