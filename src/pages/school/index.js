import { useEffect, useState } from "react";
import { departmentRoute, schoolRoute } from "../../config/api-routes";
import getDataFromAPI from "../../helpers/getDataFromAPI";
import Loading from '../../components/loading'
import { Link } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import useStyles from './index.styles'
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { FaGlobe } from "react-icons/fa"
import { UniversityPlaceholder } from "../../config/images";
import SearchBox from "../../components/index/search_box";
import { NOTES_ROUTE } from "../../config/front-routes";
import { VscFilePdf } from "react-icons/vsc";

export default function SchoolPage(props) {
    const school_domain = props.match.params.school_domain
    const classes = useStyles()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    // States for department list
    const [departmentList, setDepartmentList] = useState([])
    const [currentDepartment, setCurrentDepartment] = useState(null)
    const [departmentListLoading, setDepartmentListLoading] = useState(true)
    const [departmentListError, setDepartmentListError] = useState(null)

    useEffect(() => {
        getDataFromAPI({ route: schoolRoute + `/${school_domain}`, config: { params: currentDepartment ? { DepartmentId: currentDepartment.id } : null } })
            .then(res => {
                if (res.status === 200) {
                    setData(res.data)
                    setLoading(false)
                }
            }).catch(err => {
                setError(err && err.response && err.response.data ? err.response.data.message : "Bir sorunla karşılaştık.")
                setLoading(false)
            })
    }, [currentDepartment])

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

    return (
        <>
            {!loading && !error ?
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={4} xl={2}>
                            <div className={classes.SchoolCoverArtContainer}>
                                <img
                                    className={classes.SchoolCoverArt}
                                    src={data.cover_art ? data.cover_art : UniversityPlaceholder}
                                    alt="" />
                            </div>
                            <div className={classes.MetadataContainer}>
                                <Typography variant="body1">
                                    Ekleyen kişi: <b>{data.User.username}</b>
                                </Typography>
                                <Typography variant="body1">
                                    ID: <b>{data.id}</b>
                                </Typography>
                                <Typography variant="body1">
                                    Domain: <b>{data.domain}</b>
                                </Typography>
                                <Typography variant="body1">
                                    Ülke: <b>{data.country}</b>
                                </Typography>
                                <Typography variant="body1">
                                    Oluşturulma tarihi: <b>{new Date(data.createdAt).toLocaleString()}</b>
                                </Typography>
                                <Typography variant="body1">
                                    Güncellenme tarihi: <b>{new Date(data.updatedAt).toLocaleString()}</b>
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={8} xl={10}>
                            <div>
                                <Typography variant="h3" component="h1">
                                    {data.name}
                                </Typography>
                            </div>
                            <div className={classes.ButtonContainer}>
                                <Button href={data.webpage ? data.webpage : "/"} target="_blank">
                                    <FaGlobe size={24} /> Website
                                </Button>
                            </div>
                            <div className={classes.NotesMainContainer}>
                                {
                                    departmentList.length ?
                                        <SearchBox id="department_list" DATA_LIST={departmentList} label="Bölüm Listesi" setSelectedData={setCurrentDepartment} />
                                        : departmentListLoading ? <Loading /> : <Alert severity="error">{departmentListError}</Alert>
                                }
                                <div className={classes.NotesAltContainer}>
                                    {
                                        data.Notes.length
                                            ?
                                            <>
                                                <div className={classes.NotesContainer}>
                                                    {
                                                        data.Notes.map(note => (
                                                            <>
                                                                <div className={classes.NoteContainer}>
                                                                    <Link to={NOTES_ROUTE({ note_id: note.id })}>
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
                                                                    </Link>
                                                                </div>
                                                            </>
                                                        ))
                                                    }
                                                </div>
                                            </>
                                            : <Alert severity="warning">Not bulunamadı!</Alert>
                                    }
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                </Container>
                : loading ? <Loading /> : <Alert severity="error">{error}</Alert>
            }
        </>
    )
}