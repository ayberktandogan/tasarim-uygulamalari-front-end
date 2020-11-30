import useStyles from './selected_school_notes.styles'
import PropTypes from 'prop-types'
import { Alert } from '@material-ui/lab'
import { VscAdd, VscClose, VscFilePdf } from 'react-icons/vsc'
import { Backdrop, Box, Button, Fade, Grid, LinearProgress, Modal, TextField, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom'
import { NOTES_ROUTE } from '../../config/front-routes'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../contexts/user.context';
import axios from '../../config/axios/axios'
import { departmentRoute, noteRoute } from '../../config/api-routes'
import getDataFromAPI from '../../helpers/getDataFromAPI'
import SearchBox from './search_box'
import Loading from '../loading'
import deleteDataFromAPI from '../../helpers/deleteDataFromAPI'
import _remove from 'lodash-es/remove'

const defaultNoteData = {
    name: ""
}

function AddNoteComponent(props) {
    const { schoolData, setSelectedSchoolsNotes } = props

    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar();
    const [noteData, setNoteData] = useState(defaultNoteData)
    const [nameList, setNameList] = useState(null)
    const [fileList, setFileList] = useState(null)
    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const [departmentData, setDepartmentData] = useState([])
    const [departmentLoading, setDepartmentLoading] = useState(true)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        getDataFromAPI({ route: departmentRoute }).then(res => {
            if (res.status === 200) {
                setDepartmentData(res.data)
                setDepartmentLoading(false)
            }
        }).catch(err => {
            setDepartmentLoading(false)
        })
    }, [])

    const [open, setOpen] = useState(false);

    function __handleModalClose() {
        setNoteData(defaultNoteData)
        setFileList(null)
        setNameList(null)
    }

    function _handleOpen() {
        __handleModalClose()
        setOpen(true)
    }

    function _handleClose() {
        setOpen(false)
        __handleModalClose()
    }

    function _handleInputChange(event) {
        setNoteData(state => ({ ...state, [event.target.id]: event.target.value }))
    }

    function _handleImageInput(event) {
        const fileList = document.getElementById('upload_note_files').files

        setNameList([...fileList])
        setFileList(fileList)
    }

    function _handleDataSubmit(event) {
        event.preventDefault()

        const formData = new FormData()
        Object.keys(noteData).forEach(k => {
            if (!noteData[k]) return
            formData.append(k, noteData[k])
        })
        formData.append("SchoolId", schoolData.id)
        formData.append("DepartmentId", selectedDepartment.id)
        for (const file of fileList) {
            formData.append('note_files', file)
        }

        const config = {
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                setProgress(percentCompleted)
            },
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }

        axios.post(noteRoute(), formData, config)
            .then(res => {
                enqueueSnackbar('Not başarıyla eklendi.', {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center'
                    },
                    autoHideDuration: 3500
                })
                setSelectedSchoolsNotes(state => state && state.length ? ([...state, res.data]) : ([res.data]))
                setTimeout(() => setProgress(0), 1000)
            })
            .catch(err => {
                console.log(err)
                enqueueSnackbar(err && err.response && err.response.data ? err.response.data.message : "Notu eklerken bir sorunla karşılaştık.", {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center'
                    },
                    autoHideDuration: 3500
                })
            })
    }

    return (
        <>
            <div className={classes.AddNoteContainer} onClick={_handleOpen}>
                <div className={classes.NoteContainer}>
                    <div className={classes.PdfIcon}>
                        <VscAdd size={48} />
                    </div>
                    <div>
                        <Typography variant="h5" component="h2">
                            Not Ekle
                        </Typography>
                    </div>
                </div>
            </div>
            <Modal
                aria-labelledby="add-note-modal"
                aria-describedby="Use for adding notes"
                className={classes.ModalContainer}
                open={open}
                onClose={_handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.PaperContainer}>
                        <form onSubmit={_handleDataSubmit} autoComplete="off" encType="multipart/form-data">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        label="Not adı"
                                        value={noteData.name}
                                        onChange={_handleInputChange}
                                        variant="filled"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    {!departmentLoading ?
                                        <SearchBox id="department_list" label="Bölüm Listesi" DATA_LIST={departmentData} setSelectedSchool={setSelectedDepartment} />
                                        :
                                        <Loading />}
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                                        <input
                                            accept="application/pdf"
                                            style={{ display: "none" }}
                                            id="upload_note_files"
                                            name="note_files"
                                            multiple
                                            type="file"
                                            onChange={_handleImageInput}
                                            required
                                        />
                                        <label htmlFor="upload_note_files">
                                            <Button variant="outlined" component="span">
                                                Dosya yükle
                                    </Button>
                                        </label>
                                        {nameList ?
                                            <Typography variant="body1" component="p">
                                                {nameList.map((f, i) => `${f.name} ${i === nameList.length - 1 ? "" : " / "}`)}
                                            </Typography>
                                            :
                                            ""}

                                    </Box>
                                    <Box textAlign="center" py={2}>
                                        {nameList !== 0 ?
                                            <LinearProgress variant="determinate" value={progress} />
                                            :
                                            ""}
                                    </Box>
                                </Grid>
                            </Grid>
                            <Button
                                variant="outlined"
                                type="submit">
                                Ekle
                    </Button>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

function NoteComponent(props) {
    const { note, classes, setSelectedSchoolsNotes } = props
    const { enqueueSnackbar } = useSnackbar();

    const [user] = useContext(UserContext)
    const [open, setOpen] = useState(false)

    function __handleModalClose() {
    }

    function _handleOpen() {
        __handleModalClose()
        setOpen(true)
    }

    function _handleClose() {
        setOpen(false)
        __handleModalClose()
    }

    function _handleDeleteButtonClick(note_id) {
        deleteDataFromAPI({ route: noteRoute({ note_id }) })
            .then(res => {
                if (res.status === 200) {
                    enqueueSnackbar('Not başarıyla silindi.', {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center'
                        },
                        autoHideDuration: 3500
                    })
                    setTimeout(() => {
                        setSelectedSchoolsNotes(oldState => {
                            let newState = oldState
                            _remove(newState, function (el) {
                                return el.id === note_id
                            })
                            return ([...newState])
                        })
                        _handleClose()
                    })
                }
            }).catch(err => {
                console.log(err)
                enqueueSnackbar(err && err.response && err.response.data ? err.response.data.message : "Notu silerken bir sorunla karşılaştık.", {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center'
                    },
                    autoHideDuration: 3500
                })
            })
    }

    return (
        <>
            <div className={classes.NoteContainer}>
                {user.admin ?
                    <>
                        <div className={classes.AdminContainer}>
                            <Button
                                onClick={_handleOpen}
                                size="small">
                                <VscClose color="red" size="18" />
                            </Button>
                        </div>
                        <Modal
                            aria-labelledby="delete-note-admin"
                            aria-describedby="Delete notes for admins"
                            className={classes.ModalContainer}
                            open={open}
                            onClose={_handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={open}>
                                <div className={classes.DeleteNotePaperContainer}>
                                    <Typography variant="h4" component="h2">
                                        {note.name}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        isimli notu silmek üzeresiniz. Emin misiniz?
                                    </Typography>
                                    <Button onClick={() => _handleDeleteButtonClick(note.id)} color="secondary" fullWidth>
                                        Sil
                                    </Button>
                                </div>
                            </Fade>
                        </Modal>
                    </>
                    : ""}
                <Link to={NOTES_ROUTE({ note_id: note.id })}>
                    <div >
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
            </div>
        </>
    )
}

export default function SelectedSchoolNotes(props) {
    const { selectedSchoolsNotes, setSelectedSchoolsNotes, schoolDatabaseData } = props
    const [user] = useContext(UserContext)
    const classes = useStyles()

    if (!selectedSchoolsNotes || !selectedSchoolsNotes.length) return (
        <>
            <Alert severity="warning" className={classes.AlertContainer}>
                Seçtiğiniz okulla alakalı not bulunamadı, ama isterseniz ekleme yapabilirsiniz!
            </Alert>
            {user.token ?
                <div className={classes.NotesContainer}>
                    <AddNoteComponent schoolData={schoolDatabaseData} setSelectedSchoolsNotes={setSelectedSchoolsNotes} />
                </div>
                : ""}
        </>
    )

    return (
        <>
            <div className={classes.NotesContainer}>
                {selectedSchoolsNotes.map(note => <NoteComponent
                    setSelectedSchoolsNotes={setSelectedSchoolsNotes}
                    key={note.id}
                    note={note}
                    classes={classes} />)}
                {user.token ?
                    <AddNoteComponent
                        schoolData={schoolDatabaseData}
                        setSelectedSchoolsNotes={setSelectedSchoolsNotes} />
                    :
                    ""}
            </div>
        </>
    )
}

AddNoteComponent.propTypes = {
    schoolData: PropTypes.object.isRequired,
    setSelectedSchoolsNotes: PropTypes.func.isRequired
}

SelectedSchoolNotes.propTypes = {
    selectedSchoolsNotes: PropTypes.array,
    setSelectedSchoolsNotes: PropTypes.func.isRequired,
    schoolDatabaseData: PropTypes.object
}

NoteComponent.propTypes = {
    notes: PropTypes.object,
    classes: PropTypes.object.isRequired,
    setSelectedSchoolsNotes: PropTypes.func.isRequired
}