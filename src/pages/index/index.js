import { Container, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import SearchBox from "../../components/index/search_box";
import getDataFromAPI from "../../helpers/getDataFromAPI";
import { departmentRoute, proxyRoute, schoolRoute } from '../../config/api-routes'
import useStyles from './index.styles'
import SelectedSchool from "../../components/index/selected_school";
import SelectedSchoolNotes from "../../components/index/selected_school_notes";
import { Alert } from "@material-ui/lab";
import Loading from "../../components/loading";

export default function IndexPage() {
    const classes = useStyles()

    // States for school list
    const [schoolList, setSchoolList] = useState([])
    const [schoolListLoading, setSchoolListLoading] = useState(true)
    const [schoolListError, setSchoolListError] = useState(null)
    // States for department list
    const [departmentList, setDepartmentList] = useState([])
    const [currentDepartment, setCurrentDepartment] = useState(null)
    const [departmentListLoading, setDepartmentListLoading] = useState(true)
    const [departmentListError, setDepartmentListError] = useState(null)
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
                setSchoolListError(err && err.response ? err.response.data : err.message)
                setSchoolListLoading(false)
            })
    }, [])

    useEffect(() => {
        getDataFromAPI({ route: departmentRoute })
            .then(res => {
                if (res.status === 200) {
                    setDepartmentList(res.data)
                    return setDepartmentListLoading(false)
                }
            }).catch(err => {
                setDepartmentListError(err && err.response ? err.response.data : err.message)
                setDepartmentListLoading(false)
            })
    }, [])

    useEffect(() => {
        if (!selectedSchool) return
        setSelectedSchoolDatabaseData(null)
        setSelectedSchoolsNotesError(null)
        setSelectedSchoolsNotes(null)

        setSelectedSchoolsNotesLoading(true)
        getDataFromAPI({ route: schoolRoute + `/school-notes/${selectedSchool.domains[0]}`, config: { params: currentDepartment ? { DepartmentId: currentDepartment.id } : null } })
            .then(res => {
                if (res.status === 200) {
                    setSelectedSchoolsNotes(res.data.notes)
                    setSelectedSchoolDatabaseData(res.data.school)
                    setSelectedSchoolsNotesLoading(false)
                }
            }).catch(err => {
                setSelectedSchoolsNotesLoading(false)
                setSelectedSchoolsNotesError(err.response.data)
            })
    }, [selectedSchool])

    useEffect(() => {
        if (!selectedSchool) return
        getDataFromAPI({ route: schoolRoute + `/school-notes/${selectedSchool.domains[0]}`, config: { params: currentDepartment ? { DepartmentId: currentDepartment.id } : null } })
            .then(res => {
                if (res.status === 200) {
                    setSelectedSchoolsNotes(res.data.notes)
                    setSelectedSchoolsNotesLoading(false)
                }
            }).catch(err => {
                setSelectedSchoolsNotesLoading(false)
                setSelectedSchoolsNotesError(err.response.data)
            })
    }, [currentDepartment])

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
                            <SearchBox id="school_list" DATA_LIST={schoolList} label="Okul Listesi" setSelectedData={setSelectedSchool} />
                        </div>
                    :
                    <Loading />}
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
                            {
                                departmentList.length ?
                                    <SearchBox id="department_list" DATA_LIST={departmentList} label="Bölüm Listesi" setSelectedData={setCurrentDepartment} />
                                    : departmentListLoading ? <Loading /> : <Alert severity="error">{departmentListError}</Alert>
                            }
                            <SelectedSchoolNotes
                                schoolDatabaseData={selectedSchoolDatabaseData}
                                selectedSchoolsNotes={selectedSchoolsNotes}
                                setSelectedSchoolsNotes={setSelectedSchoolsNotes} />
                        </div>
                    :
                    ""
                }
            </Container>
        </>
    )
}