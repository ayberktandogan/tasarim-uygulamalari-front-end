import { CircularProgress, Container, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import SearchBox from "../../components/index/search_box";
import getDataFromAPI from "../../helpers/getDataFromAPI";
import { proxyRoute, schoolRoute } from '../../config/api-routes'
import useStyles from './index.styles'
import SelectedSchool from "../../components/index/selected_school";
import SelectedSchoolNotes from "../../components/index/selected_school_notes";
import { Alert } from "@material-ui/lab";

export default function IndexPage() {
    const classes = useStyles()

    // States for school list
    const [schoolList, setSchoolList] = useState([])
    const [schoolListLoading, setSchoolListLoading] = useState(true)
    const [schoolListError, setSchoolListError] = useState(null)
    // States for selected school and its notes
    const [selectedSchool, setSelectedSchool] = useState(null)
    const [selectedSchoolsNotes, setSelectedSchoolsNotes] = useState([])
    const [selectedSchoolsNotesLoading, setSelectedSchoolsNotesLoading] = useState(false)
    const [selectedSchoolsNotesError, setSelectedSchoolsNotesError] = useState(null)
    const [selectedSchoolDatabaseData, setSelectedSchoolDatabaseData] = useState(null)

    useEffect(() => {
        getDataFromAPI({ route: `${proxyRoute}/school_list` })
            .then(res => {
                if (res.status === 200) {
                    setSchoolList(res.data)
                    return setSchoolListLoading(false)
                }
            }).catch(err => {
                setSchoolListLoading(false)
                setSchoolListError(err.response.data)
            })
    }, [])

    useEffect(() => {
        if (!selectedSchool) {
            setSelectedSchoolDatabaseData(null)
            return setSelectedSchoolsNotesError(null)
        }
        setSelectedSchoolDatabaseData(null)
        setSelectedSchoolsNotesError(null)
        setSelectedSchoolsNotesLoading(true)
        getDataFromAPI({ route: schoolRoute + `/school-notes/${selectedSchool.domains[0]}`, limit: 8 })
            .then(res => {
                if (res.status === 200) {
                    setSelectedSchoolsNotes(res.data.notes)
                    setSelectedSchoolDatabaseData(res.data.school)
                    setSelectedSchoolsNotesLoading(false)
                }
            }).catch(err => {
                console.log(err)
                setSelectedSchoolsNotesLoading(false)
                setSelectedSchoolsNotesError(err.response.data)
            })
    }, [selectedSchool])

    return (
        <>
            <Container maxWidth="lg" className={classes.MainContainer}>
                <Typography variant="h2" component="h1" className={classes.MainTitle}>
                    Hangi okulun notunu istiyorsunuz?
                </Typography>
                {!schoolListLoading ?
                    schoolListError ?
                        <Typography variant="h2" component="h1">
                            {schoolListError}
                        </Typography>
                        :
                        <div className={classes.SearchBoxSection}>
                            <SearchBox SCHOOL_LIST={schoolList} setSelectedSchool={setSelectedSchool} />
                        </div>
                    :
                    <CircularProgress />}
                {selectedSchool ?
                    <div className={classes.SelectedSchoolSection}>
                        <SelectedSchool
                            schoolData={selectedSchool}
                            schoolDatabaseData={selectedSchoolDatabaseData}
                            setSelectedSchoolDatabaseData={setSelectedSchoolDatabaseData}
                            error={selectedSchoolsNotesError}
                            setError={setSelectedSchoolsNotesError} />
                    </div>
                    : ""}
                {!selectedSchoolsNotesLoading && selectedSchoolDatabaseData ?
                    selectedSchoolsNotesError ?
                        <Alert severity="error">
                            Notları bulurken bir sorunla karşılaştık.
                        </Alert>
                        :
                        <div className={classes.SelectedSchoolNotesSection}>
                            <SelectedSchoolNotes selectedSchoolsNotes={selectedSchoolsNotes} />
                        </div>
                    :
                    ""
                }
            </Container>
        </>
    )
}