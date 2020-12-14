import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    SchoolCoverArtContainer: {
        backgroundColor: theme.palette.background.paper
    },
    SchoolCoverArt: {
        width: "100%"
    },
    ButtonContainer: {
        "& svg": {
            marginRight: theme.spacing(1)
        },
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    MetadataContainer: {
        marginTop: theme.spacing(2)
    },
    NotesMainContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column"
    },
    NotesAltContainer: {
        width: "100%",
        marginTop: theme.spacing(2)
    },
    NotesContainer: {
        width: "100%",
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
        position: "relative",
        "& a": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center"
        }
    },
    PdfIcon: {
        marginBottom: theme.spacing(2)
    },
}))