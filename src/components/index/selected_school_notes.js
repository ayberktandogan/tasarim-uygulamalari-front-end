import useStyles from './selected_school_notes.styles'
import PropTypes from 'prop-types'
import { Alert } from '@material-ui/lab'

export default function SelectedSchoolNotes(props) {
    const { selectedSchoolsNotes } = props
    const classes = useStyles()

    if (!selectedSchoolsNotes.length) return (
        <>
            <Alert severity="warning">
                Seçtiğiniz okulla alakalı not bulunamadı, ama isterseniz ekleme yapabilirsiniz!
            </Alert>
        </>
    )


    return (
        <>
            <div>

            </div>
        </>
    )
}

SelectedSchoolNotes.propTypes = {
    selectedSchoolsNotes: PropTypes.array.isRequired
}