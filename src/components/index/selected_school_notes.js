import useStyles from './selected_school_notes.styles'
import PropTypes from 'prop-types'
import { Alert } from '@material-ui/lab'
import { VscFilePdf } from 'react-icons/vsc'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { NOTES_ROUTE } from '../../config/front-routes'

function NoteComponent(props) {
    const { note, classes } = props
    return (
        <>
            <Link to={NOTES_ROUTE({ note_id: note.id })}>
                <div className={classes.NoteContainer}>
                    <div className={classes.PdfIcon}>
                        <VscFilePdf size={48} />
                    </div>
                    <div>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {note.name}
                        </Typography>
                        <div>
                            <Typography variant="body1">
                                <b>{note.Department.name}</b>
                            </Typography>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default function SelectedSchoolNotes(props) {
    const { selectedSchoolsNotes } = props
    const classes = useStyles()

    if (!selectedSchoolsNotes || !selectedSchoolsNotes.length) return (
        <>
            <Alert severity="warning">
                Seçtiğiniz okulla alakalı not bulunamadı, ama isterseniz ekleme yapabilirsiniz!
            </Alert>
        </>
    )

    return (
        <>
            <div className={classes.NotesContainer}>
                {selectedSchoolsNotes.map(note => <NoteComponent key={note.id} note={note} classes={classes} />)}
            </div>
        </>
    )
}

SelectedSchoolNotes.propTypes = {
    selectedSchoolsNotes: PropTypes.array
}

NoteComponent.propTypes = {
    notes: PropTypes.array,
    classes: PropTypes.object.isRequired
}